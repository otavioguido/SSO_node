import os
from python_terraform import Terraform
import subprocess

def deploy_service():
    # Load environment variables
    cloudflare_api_token = os.getenv("CLOUDFLARE_API_TOKEN")
    cloudflare_zone_id = os.getenv("CLOUDFLARE_ZONE_ID")
    route_pattern = os.getenv("ROUTE_PATTERN", "sso_node.ogs.lat/*")
    kv_data = {
        "BACKEND_URL": os.getenv("BACKEND_URL", "https://your-backend-url"),
        "API_TOKEN": os.getenv("API_TOKEN", "your-api-token"),
    }

    # Validate required variables
    if not cloudflare_api_token or not cloudflare_zone_id:
        print("Error: CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID is missing.")
        return

    # Write KV data using wrangler
    for key, value in kv_data.items():
        command = [
            "wrangler",
            "kv:key",
            "put",
            "--binding",
            "MY_KV",
            key,
            value,
        ]
        subprocess.run(command)

    # Run Terraform
    terraform = Terraform(working_dir="./")
    return_code, stdout, stderr = terraform.apply(
        var={
            "cloudflare_api_token": cloudflare_api_token,
            "cloudflare_zone_id": cloudflare_zone_id,
            "route_pattern": route_pattern,
        },
        capture_output=True,
        skip_plan=True,
    )

    if return_code == 0:
        print("Service deployed successfully!")
    else:
        print(f"Failed to deploy service: {stderr}")


if __name__ == "__main__":
    deploy_service()
