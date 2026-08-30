pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t shortnews .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop shortnews_container || exit 0'
            }
        }

        stage('Remove Old Container') {
            steps {
                bat 'docker rm shortnews_container || exit 0'
            }
        }

        stage('Run New Container') {
            steps {
                bat 'docker run -d -p 8081:80 --name shortnews_container shortnews'
            }
        }

    }
}