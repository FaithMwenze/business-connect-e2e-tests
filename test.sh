#!/bin/bash

set +x 
set -o pipefail
 
sudo docker build -t wambui/business-connect-e2e-tests:v1.0.0 --build-arg HTTP_PROXY=http://192.168.204.70:8080 
--build-arg HTTPS_PROXY=http://192.168.204.70:8080 .

sleep 10
sudo docker run -e LOGIN_URL \
-e SUPER_ADMIN_MAKER_USERNAME \
-e SUPER_ADMIN_MAKER_PASSWORD \
-e SUPER_ADMIN_CHECKER_USERNAME \
-e SUPER_ADMIN_CHECKER_PASSWORD \
-e DASHBOARD_URL \
-e BANK_ADMIN_MAKER_USERNAME \
-e BANK_ADMIN_MAKER_PASSWORD \
-e BANK_ADMIN_CHECKER_USERNAME \
-e BANK_ADMIN_CHECKER_PASSWORD \
-e CORPORATE_ADMIN_MAKER_USERNAME \
-e CORPORATE_ADMIN_MAKER_PASSWORD \
-e CORPORATE_ADMIN_CHECKER_USERNAME \
-e CORPORATE_ADMIN_CHECKER_PASSWORD \
-e KEYCLOAK_USERNAME \
-e KEYCLOAK_PASSWORD \
-e KEYCLOAK_URL \
 wambui/business-connect-e2e-tests:v1.0.0

exit $?
