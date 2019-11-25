pipeline {
    agent any
    tools {nodejs "node"} 

    environment {
        CHROME_BIN = '/bin/google-chrome'
    }

    stages {
        stage("install dependencies") {
            steps {
                sh 'npm i'
            }
        }
        stage("e2e tests"){
            steps {
              sh 'npm test'
            }
        }
    }
}