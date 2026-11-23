#!/usr/bin/env python3
"""
CI / Quality Check Runner for etalase.online
Runs prisma validation, TypeScript typechecking, and Next.js build.
Outputs concise colorized status for token-efficient debugging.
"""
import subprocess
import sys
import time

GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
RESET = "\033[0m"

def run_step(name: str, cmd: list[str]) -> bool:
    print(f"\n{YELLOW}==> Running: {name}...{RESET}")
    start = time.time()
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    dur = round(time.time() - start, 2)
    
    if res.returncode == 0:
        print(f"{GREEN}✓ {name} passed ({dur}s){RESET}")
        return True
    else:
        print(f"{RED}✗ {name} failed ({dur}s):{RESET}")
        # Print only last 25 lines to save token context
        lines = res.stdout.strip().split("\n")
        print("\n".join(lines[-25:]))
        return False

def main():
    steps = [
        ("Prisma Schema Validation", ["npx", "prisma", "validate"]),
        ("TypeScript Typecheck", ["npx", "tsc", "--noEmit"]),
        ("Next.js Build Check", ["npm", "run", "build"]),
    ]

    all_passed = True
    for name, cmd in steps:
        if not run_step(name, cmd):
            all_passed = False
            break

    if all_passed:
        print(f"\n{GREEN}✨ All CI checks passed successfully!{RESET}\n")
        sys.exit(0)
    else:
        print(f"\n{RED}❌ CI checks failed. Please resolve the errors above.{RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
