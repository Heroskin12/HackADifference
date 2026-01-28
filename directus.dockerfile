# Use the official Directus image as the base
FROM directus/directus:latest

# Environment variables are **not** hardcoded here—set them via Render's environment dashboard!
# Examples:
# - KEY: "a-very-secret-key"
# - ADMIN_EMAIL: "admin@example.com"
# - ADMIN_PASSWORD: "secure_password"
# - DB_CLIENT: "pg"
# - DB_HOST: "your-postgres-host"
# - DB_PORT: "5432"
# - DB_DATABASE: "your_db"
# - DB_USER: "your_user"
# - DB_PASSWORD: "your_password"

# If you have additional config files (e.g., directus extensions, static assets), you can COPY them here.
# Example:
# COPY ./extensions /directus/extensions

# Optional: Use a healthcheck for better container orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD wget --spider -q http://localhost:8055/server/health || exit 1

# The default command already runs Directus server on port 8055.
# No need to override CMD or ENTRYPOINT unless you have custom logic.

# Expose the Directus default port (for documentation/clarity)
EXPOSE 8055