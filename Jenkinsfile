pipeline {
    agent any
    environment {
        LOGIN_URL=credentials('login-url')
        BANK_ADMIN_MAKER_USERNAME=credentials('bank-admin-maker-username')
        BANK_ADMIN_MAKER_PASSWORD=credentials('bank-admin-maker-password')
        SUPER_ADMIN_MAKER_USERNAME=credentials('super-admin-maker-username')
        SUPER_ADMIN_MAKER_PASSWORD=credentials('super-admin-maker-password')
        SUPER_ADMIN_CHECKER_USERNAME=credentials('super-admin-checker-username')
        SUPER_ADMIN_CHECKER_PASSWORD=credentials('super-admin-checker-password')
        DASHBOARD_URL=credentials('dashboard-url')
        BANK_ADMIN_CHECKER_USERNAME=credentials('bank-admin-checker-username')
        BANK_ADMIN_CHECKER_PASSWORD=credentials('bank-admin-checker-password')
        CORPORATE_ADMIN_MAKER_USERNAME=credentials('corporate-admin-maker-username')
        CORPORATE_ADMIN_MAKER_PASSWORD=credentials('corporate-admin-maker-password')
        CORPORATE_ADMIN_CHECKER_USERNAME=credentials('corporate-admin-checker-username')
        CORPORATE_ADMIN_CHECKER_PASSWORD=credentials('corporate-admin-checker-password')
        KEYCLOAK_USERNAME=credentials('keycloak-username')
        KEYCLOAK_PASSWORD=credentials('keycloak-password')
        KEYCLOAK_URL=credentials('keycloak-url')        
    }  
    stages {
        stage("Run end 2 end tests inside docker container") {       
            steps {
                sh 'env'
                sh './test.sh'
                
        }
    }

  }
}