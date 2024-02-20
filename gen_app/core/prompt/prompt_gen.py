import json


class PromptGenerator():
    def __init__(self):
        pass
    
    
    def get_prompt(difficulty: str, data_structures: list, programming_language: str):
        data_structures_str = ", ".join(data_structures)
        json_schema = {
            "challenge": "",
            "entry_function": "",
            "test_cases": [],
            "solution": ""
        }
        json_schema_str = json.dumps(json_schema, indent=2)
        prompt = f"""As an intelligent Leetcode Builder API, given the following criteria:
- Difficulty: {difficulty}
- Data Structures: {data_structures_str}
- Programming Language: {programming_language}

Create a leetcode question, make it a random scenario where the solution should involve the data structure for the best solution.

The response as follows:
1: "challenge": "text with the Leetcode challenge, give test cases and example result of test case and explain why"
2: "entry_function": "example in Python, e.g., def solve(arr: list) -> int: return -1"
3: "test_cases": "JSON format with input values and output values"
4: "solution": "one way to solve the challenge"

Your task is to generate a response that conforms to the following JSON schema:
{json_schema_str}

Please fill in the schema with appropriate values based on the criteria. Ensure the response strictly adheres to the given schema format."""