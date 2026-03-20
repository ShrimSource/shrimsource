# Code Review Agent

Reviews a given code snippet or GitHub PR URL for bugs, security issues, and style improvements.

Run with Shrimsource:
```bash
npx create-shrimsource code-review-agent
```

## Example

**Input:**
```
Code: "eval(req.body.code)"
```

**Output:**
```
CRITICAL ERROR: Use of eval() poses a severe Remote Code Execution (RCE) vulnerability. 
Recommendation: Use a sandboxed virtual machine or avoid executing dynamic code entirely.
```
