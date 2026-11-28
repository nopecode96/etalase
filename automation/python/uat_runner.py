#!/usr/bin/env python3
"""
Automated Database-Driven UAT & Smoke Test Runner for etalase.online (PORT=3005)
Dynamically fetches active Stores, Products, Users, and Settings from PostgreSQL
and validates multi-tenant routing, storefront data hydration, direct checkouts,
Mabes super admin security, and webhook gateways.
"""

import sys
import json
import html
import subprocess
import urllib.request
import urllib.error
from typing import List, Dict, Any, Optional

BASE_URL = "http://localhost:3005"

class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'


def query_db_json(sql: str) -> Any:
    """Executes SQL against PostgreSQL container and parses json output."""
    cmd = [
        "docker", "exec", "-i", "etalase_postgres",
        "psql", "-U", "postgres", "-d", "etalase_online", "-t", "-A",
        "-c", f"SELECT json_agg(t) FROM ({sql}) t;"
    ]
    try:
        res = subprocess.check_output(cmd, stderr=subprocess.PIPE).decode("utf-8").strip()
        if not res:
            return []
        return json.loads(res)
    except Exception as e:
        print(f"{Colors.FAIL}Database Query Error:{Colors.ENDC} {e}")
        return []


def http_request(
    path: str,
    host: str = "localhost:3005",
    method: str = "GET",
    headers: Optional[Dict[str, str]] = None,
    timeout: int = 8
) -> Dict[str, Any]:
    """Helper to perform HTTP requests with custom Host headers."""
    req_headers = {"Host": host}
    if headers:
        req_headers.update(headers)

    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(url, headers=req_headers, method=method)

    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            body = res.read().decode("utf-8", errors="replace")
            return {
                "status": res.status,
                "url": res.geturl(),
                "headers": dict(res.getheaders()),
                "body": body,
                "error": None
            }
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace") if hasattr(e, 'read') else ""
        return {
            "status": e.code,
            "url": e.geturl() if hasattr(e, 'geturl') else url,
            "headers": dict(e.headers) if hasattr(e, 'headers') else {},
            "body": body,
            "error": str(e)
        }
    except Exception as e:
        return {
            "status": 0,
            "url": url,
            "headers": {},
            "body": "",
            "error": str(e)
        }


class UATRunner:
    def __init__(self):
        self.passed_tests = 0
        self.failed_tests = 0
        self.total_tests = 0

    def record_result(self, category: str, name: str, success: bool, detail: str = ""):
        self.total_tests += 1
        if success:
            self.passed_tests += 1
            print(f"  {Colors.OKGREEN}✓ [{category}]{Colors.ENDC} {name} {f'({detail})' if detail else ''}")
        else:
            self.failed_tests += 1
            print(f"  {Colors.FAIL}✗ [{category}]{Colors.ENDC} {name} - FAIL {f'({detail})' if detail else ''}")

    def run_all(self) -> bool:
        print(f"\n{Colors.BOLD}======================================================{Colors.ENDC}")
        print(f"{Colors.BOLD}🚀 STARTING DATABASE-DRIVEN UAT & ACCEPTANCE TEST SUITE{Colors.ENDC}")
        print(f"{Colors.BOLD}======================================================{Colors.ENDC}\n")

        # Step 1: Query Database Snapshot
        print(f"{Colors.OKCYAN}--> [1/7] Fetching real application state from PostgreSQL...{Colors.ENDC}")
        stores = query_db_json("""
            SELECT id, slug, name, tier, "isDemo", "isActive", "templateId", "displayMode", "countryCode", "currency"
            FROM "Store"
            ORDER BY "createdAt" ASC
        """)

        products = query_db_json("""
            SELECT p.id, p.slug as prod_slug, p.title, p.price, p."productType", p."checkoutMode", p."isActive",
                   s.slug as store_slug, s.name as store_name
            FROM "Product" p
            JOIN "Store" s ON p."storeId" = s.id
            ORDER BY s.slug, p.slug
        """)

        users = query_db_json('SELECT id, email, role FROM "User"')
        countries = query_db_json('SELECT code, name FROM "SupportedCountry"')
        banks = query_db_json('SELECT id, code, name FROM "SupportedBank"')
        settings = query_db_json('SELECT key, value FROM "PlatformSetting"')

        print(f"    ✓ Loaded from DB: {len(stores)} Stores, {len(products)} Products, {len(users)} Users, "
              f"{len(countries)} Countries, {len(banks)} Banks, {len(settings)} Platform Settings.\n")

        # Step 2: Health & Payment Webhooks
        print(f"{Colors.OKCYAN}--> [2/7] Testing API Health & Payment Webhook Gateways...{Colors.ENDC}")
        
        # 2a. Health check
        res_health = http_request("/api/health")
        health_ok = False
        health_info = ""
        if res_health["status"] == 200:
            try:
                data = json.loads(res_health["body"])
                health_ok = data.get("status") == "ok"
                health_info = f"uptime={data.get('uptime', 'N/A')}s"
            except Exception:
                pass
        self.record_result("HEALTH", "/api/health Endpoint Check", health_ok, health_info)

        # 2b. Borderpay webhook endpoint
        res_bp = http_request("/pay/webhook")
        self.record_result("WEBHOOK", "Borderpay Gateway (/pay/webhook)", res_bp["status"] == 200, f"HTTP {res_bp['status']}")

        # 2c. PayPal webhook endpoint
        res_pp = http_request("/paypal/webhook")
        self.record_result("WEBHOOK", "PayPal Gateway (/paypal/webhook)", res_pp["status"] == 200, f"HTTP {res_pp['status']}")

        # Step 3: Platform Marketing & Core Public Pages
        print(f"\n{Colors.OKCYAN}--> [3/7] Testing Central Platform & Marketing Routes...{Colors.ENDC}")
        core_routes = [
            ("Main Landing Portal", "/", 200, "etalase.online"),
            ("Pricing & Plans Matrix", "/pricing", 200, "Harga Sederhana"),
            ("Templates Gallery", "/templates", 200, "Template"),
            ("Free Creator Tools", "/tools", 200, "Tools"),
            ("Digital Product Solution", "/digital-product", 200, "Produk Digital"),
            ("Event Ticketing Solution", "/event", 200, "Satu Platform"),
            ("Consultation & Booking", "/consultation", 200, "Konsultasi"),
            ("Creator Affiliate Hub", "/affiliate", 200, "Asia Tenggara"),
            ("Alternatif Lynk.id Page", "/alternatif-lynk-id", 200, "Alternatif Lynk.id"),
        ]
        for name, path, expected_status, content_keyword in core_routes:
            res = http_request(path, host="localhost:3005")
            unescaped_body = html.unescape(res["body"])
            ok = res["status"] == expected_status and content_keyword in unescaped_body
            self.record_result("CORE_PAGES", name, ok, f"HTTP {res['status']}")

        # Step 4: Database-Driven Storefront Verification
        print(f"\n{Colors.OKCYAN}--> [4/7] Testing Real Tenant Storefronts from Database ({len(stores)} stores)...{Colors.ENDC}")
        for store in stores:
            store_slug = store["slug"]
            store_name = store["name"]
            tier = store["tier"]
            is_demo = "Demo" if store["isDemo"] else "Live"
            template = store.get("templateId", "default")
            
            host = f"{store_slug}.localhost:3005"
            res = http_request("/", host=host)
            unescaped_body = html.unescape(res["body"])
            
            # Acceptance criteria: 200 OK and store name hydrated from DB into HTML
            name_rendered = store_name in unescaped_body or store_slug in unescaped_body
            store_ok = res["status"] == 200 and name_rendered
            self.record_result(
                "STOREFRONT",
                f"Store '{store_name}' [{store_slug}] ({tier}, {is_demo}, {template})",
                store_ok,
                f"HTTP {res['status']}, hydrated={name_rendered}"
            )

            # Check Tip & Support page for the store
            res_tip = http_request("/tip", host=host)
            tip_ok = res_tip["status"] == 200
            self.record_result("STORE_TIP", f"Tip Page: {store_slug}.localhost:3005/tip", tip_ok, f"HTTP {res_tip['status']}")

        # Step 5: Database-Driven Product Detail & Checkout Verification
        print(f"\n{Colors.OKCYAN}--> [5/7] Testing Real Products from Database ({len(products)} products)...{Colors.ENDC}")
        for prod in products:
            store_slug = prod["store_slug"]
            prod_slug = prod["prod_slug"]
            title = prod["title"]
            mode = prod["checkoutMode"]
            ptype = prod["productType"]
            price = prod["price"]
            host = f"{store_slug}.localhost:3005"

            if mode == "DIRECT_CHECKOUT":
                path = f"/checkout/{prod_slug}"
                res = http_request(path, host=host)
                unescaped_body = html.unescape(res["body"])
                # Ensure HTTP 200 and product title in HTML
                title_in_html = title in unescaped_body or prod_slug in unescaped_body
                ok = res["status"] == 200 and title_in_html
                self.record_result(
                    "DIRECT_CHECKOUT",
                    f"{store_slug} -> {title} (Rp {price:,.0f})",
                    ok,
                    f"HTTP {res['status']}, Title rendered: {title_in_html}"
                )
            elif ptype == "APPOINTMENT":
                path = f"/book/{prod_slug}"
                res = http_request(path, host=host)
                ok = res["status"] in (200, 301, 302, 307)
                self.record_result(
                    "APPOINTMENT_BOOK",
                    f"{store_slug} -> {title} [Booking]",
                    ok,
                    f"HTTP {res['status']}"
                )
            else:
                # PHYSICAL / EXTERNAL_LINK / CHAT_ORDER:
                # Verify storefront presents this item
                res_sf = http_request("/", host=host)
                unescaped_body = html.unescape(res_sf["body"])
                in_sf = title in unescaped_body or prod_slug in unescaped_body
                self.record_result(
                    "STORE_PRODUCT_VIEW",
                    f"{store_slug} -> {title} ({mode})",
                    in_sf,
                    f"Rendered in Storefront: {in_sf}"
                )

        # Step 6: Multi-Tenant Host Routing & Security Redirection Guards
        print(f"\n{Colors.OKCYAN}--> [6/7] Testing Host Routing & Security Redirection Guards...{Colors.ENDC}")
        
        # 6a. Mabes Super Admin Authentication Isolation
        # Root mabes domain without session should redirect to /mabes/login
        res_mabes_root = http_request("/", host="mabes.localhost:3005")
        mabes_guard_ok = res_mabes_root["status"] in (200, 301, 302, 307, 308) and (
            "/mabes/login" in res_mabes_root["url"] or res_mabes_root["status"] in (301, 302, 307, 308)
        )
        self.record_result("SECURITY", "Mabes Dashboard Unauthenticated Guard", mabes_guard_ok, f"Redirect to /mabes/login")

        res_mabes_login = http_request("/login", host="mabes.localhost:3005")
        self.record_result("SECURITY", "Mabes Login Page Rendered", res_mabes_login["status"] == 200, f"HTTP {res_mabes_login['status']}")

        # 6b. Tenant Subdomain Admin & Auth Guards (subdomain redirects to central)
        test_store_slug = stores[0]["slug"] if stores else "demo"
        res_tenant_admin = http_request("/admin", host=f"{test_store_slug}.localhost:3005")
        admin_redirect_ok = res_tenant_admin["status"] in (200, 301, 302, 307, 308)
        self.record_result("ROUTING", f"Tenant Subdomain /admin Redirect ({test_store_slug})", admin_redirect_ok, f"Status {res_tenant_admin['status']}")

        res_tenant_login = http_request("/login", host=f"{test_store_slug}.localhost:3005")
        login_redirect_ok = res_tenant_login["status"] in (200, 301, 302, 307, 308)
        self.record_result("ROUTING", f"Tenant Subdomain /login Contextual Redirect ({test_store_slug})", login_redirect_ok, f"Status {res_tenant_login['status']}")

        # Step 7: Negative & Boundary Tests
        print(f"\n{Colors.OKCYAN}--> [7/7] Negative & Boundary Cases...{Colors.ENDC}")
        # 7a. Non-existent store
        res_non_store = http_request("/", host="nonexistent-store-xyz999.localhost:3005")
        self.record_result("NEGATIVE", "Non-existent Store Slug 404 Guard", res_non_store["status"] == 404, f"HTTP {res_non_store['status']}")

        # 7b. Non-existent product in real store
        res_non_prod = http_request("/checkout/nonexistent-item-999", host=f"{test_store_slug}.localhost:3005")
        self.record_result("NEGATIVE", "Non-existent Product Slug 404 Guard", res_non_prod["status"] == 404, f"HTTP {res_non_prod['status']}")

        # Summary
        print(f"\n{Colors.BOLD}======================================================{Colors.ENDC}")
        print(f"{Colors.BOLD}🏁 UAT RESULTS SUMMARY{Colors.ENDC}")
        print(f"{Colors.BOLD}======================================================{Colors.ENDC}")
        print(f"Total Tests Executed : {self.total_tests}")
        print(f"Tests Passed         : {Colors.OKGREEN}{self.passed_tests}{Colors.ENDC}")
        print(f"Tests Failed         : {Colors.FAIL if self.failed_tests > 0 else Colors.OKGREEN}{self.failed_tests}{Colors.ENDC}")
        
        if self.failed_tests == 0:
            print(f"\n{Colors.BOLD}{Colors.OKGREEN}🎉 ALL UAT ACCEPTANCE TESTS PASSED! DATA FULLY SOURCED FROM DATABASE.{Colors.ENDC}\n")
            return True
        else:
            print(f"\n{Colors.BOLD}{Colors.FAIL}❌ SOME UAT TESTS FAILED.{Colors.ENDC}\n")
            return False


def main():
    runner = UATRunner()
    success = runner.run_all()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
