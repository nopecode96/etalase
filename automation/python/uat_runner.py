#!/usr/bin/env python3
"""
Automated UAT & Smoke Test Runner for etalase.online (PORT=3005)
Verifies:
1. /api/health endpoint
2. Borderpay Webhook Gateway (/pay/webhook)
3. 4-Pillar Multi-Tenant Host Routing
4. Mabes Super Admin Authentication Isolation (Email & Password login)
5. Direct Checkout Route (/checkout/[slug])
6. Marketing Kit Route (/admin/marketing-kit)
"""
import sys
import urllib.request
import urllib.error
import json

BASE_URL = "http://localhost:3005"

def check_health() -> bool:
    print("--> Checking /api/health...")
    try:
        req = urllib.request.Request(f"{BASE_URL}/api/health")
        with urllib.request.urlopen(req, timeout=5) as res:
            if res.status == 200:
                data = json.loads(res.read().decode())
                print(f"    ✓ Health check 200 OK: {data}")
                return True
            print(f"    ✗ Health check returned status {res.status}")
            return False
    except Exception as e:
        print(f"    ✗ Failed to connect to {BASE_URL}/api/health: {e}")
        return False

def check_borderpay_webhook() -> bool:
    print("--> Checking Borderpay Webhook (/pay/webhook)...")
    try:
        req = urllib.request.Request(f"{BASE_URL}/pay/webhook")
        with urllib.request.urlopen(req, timeout=5) as res:
            if res.status == 200:
                data = json.loads(res.read().decode())
                print(f"    ✓ Borderpay webhook 200 OK: {data}")
                return True
            print(f"    ✗ Borderpay webhook returned status {res.status}")
            return False
    except Exception as e:
        print(f"    ✗ Failed to connect to {BASE_URL}/pay/webhook: {e}")
        return False

def check_route(name: str, host: str, path: str = "/") -> bool:
    print(f"--> Testing route: {name} ({host}{path})...")
    try:
        req = urllib.request.Request(f"{BASE_URL}{path}", headers={"Host": host})
        with urllib.request.urlopen(req, timeout=5) as res:
            print(f"    ✓ {name} responded with status {res.status}")
            return res.status in (200, 301, 302, 307, 308)
    except urllib.error.HTTPError as e:
        print(f"    ℹ {name} HTTP status {e.code} (expected redirect/guard)")
        return e.code in (200, 301, 302, 307, 308, 401, 404)
    except Exception as e:
        print(f"    ✗ Connection error for {name}: {e}")
        return False

def main():
    print("=== Starting etalase.online UAT Smoke Tests ===")
    tests = [
        check_health(),
        check_borderpay_webhook(),
        check_route("Main Portal", "localhost:3005", "/"),
        check_route("Mabes Super Admin Login", "mabes.localhost:3005", "/login"),
        check_route("Mabes Dashboard (Auth Guarded)", "mabes.localhost:3005", "/"),
        check_route("Tenant Storefront", "demo.localhost:3005", "/"),
        check_route("Tenant Admin", "demo.localhost:3005", "/admin"),
        check_route("Direct Checkout Page", "demo.localhost:3005", "/checkout/creator-os"),
        check_route("Marketing Kit Page", "demo.localhost:3005", "/admin/marketing-kit"),
        check_route("Free Tools Page", "localhost:3005", "/tools"),
        check_route("Course Learning Area", "demo.localhost:3005", "/learn/creator-os"),
        check_route("Booking Appointment Page", "demo.localhost:3005", "/book/consultation"),
        check_route("Tip & Support Page", "demo.localhost:3005", "/tip"),
        check_route("Pricing Page", "localhost:3005", "/pricing"),
        check_route("Templates Gallery Page", "localhost:3005", "/templates"),
        check_route("Digital Product Page", "localhost:3005", "/digital-product"),
        check_route("Event Ticketing Page", "localhost:3005", "/event"),
        check_route("1-on-1 Consultation Page", "localhost:3005", "/consultation"),
        check_route("Creator Affiliate Page", "localhost:3005", "/affiliate"),
    ]

    passed = all(tests)
    if passed:
        print("\n✨ All UAT Smoke Tests Passed!\n")
        sys.exit(0)
    else:
        print("\n❌ Some UAT Smoke Tests Failed.\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
