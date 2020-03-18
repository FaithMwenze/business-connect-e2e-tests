#!/bin/bash

set +x 
set -o pipefail
sudo docker build -t wambui/business-connect-e2e-tests:v1.0.2 . 

sleep 5
echo $LOGIN_URL
sudo docker run --env LOGIN_URL=$LOGIN_URL \
--env BANK_ADMIN_MAKER_USERNAME=$BANK_ADMIN_MAKER_USERNAME \
--env BANK_ADMIN_MAKER_PASSWORD=$BANK_ADMIN_MAKER_PASSWORD \
--env SUPER_ADMIN_MAKER_USERNAME=$SUPER_ADMIN_MAKER_USERNAME \
--env SUPER_ADMIN_MAKER_PASSWORD=$SUPER_ADMIN_MAKER_PASSWORD \
--env SUPER_ADMIN_CHECKER_USERNAME=$SUPER_ADMIN_CHECKER_USERNAME \
--env SUPER_ADMIN_CHECKER_PASSWORD=$SUPER_ADMIN_CHECKER_PASSWORD \
--env DASHBOARD_URL=$DASHBOARD_URL \
--env BANK_ADMIN_CHECKER_USERNAME=$BANK_ADMIN_CHECKER_USERNAME \
--env BANK_ADMIN_CHECKER_PASSWORD=$BANK_ADMIN_CHECKER_PASSWORD \
--env BANK_USER_MAKER_USERNAME=$BANK_USER_MAKER_USERNAME \
--env BANK_USER_MAKER_PASSWORD=$BANK_USER_MAKER_PASSWORD \
--env BANK_USER_CHECKER_USERNAME=$BANK_USER_CHECKER_USERNAME \
--env BANK_USER_CHECKER_PASSWORD=$BANK_USER_CHECKER_PASSWORD \
--env CORPORATE_ADMIN_MAKER_USERNAME=$CORPORATE_ADMIN_MAKER_USERNAME \
--env CORPORATE_ADMIN_MAKER_PASSWORD=$CORPORATE_ADMIN_MAKER_PASSWORD \
--env CORPORATE_ADMIN_CHECKER_USERNAME=$CORPORATE_ADMIN_CHECKER_USERNAME \
--env CORPORATE_ADMIN_CHECKER_PASSWORD=$CORPORATE_ADMIN_CHECKER_PASSWORD \
--env KEYCLOAK_USERNAME=$KEYCLOAK_USERNAME \
--env KEYCLOAK_PASSWORD=$KEYCLOAK_PASSWORD \
--env KEYCLOAK_URL=$KEYCLOAK_URL \
--network='host' \
wambui/business-connect-e2e-tests:v1.0.2 --proxy 192.168.204.70:8080 

echo "Done"
exit $?
