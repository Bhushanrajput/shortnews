pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "bhushan432/shortnews:${BUILD_NUMBER}"
        EC2_HOST = "3.108.40.96"
        EC2_USER = "ec2-user"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Docker Hub Login and Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat '''
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %DOCKER_IMAGE%
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-shortnews']) {
                    bat '''
                        ssh -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "sudo docker pull %DOCKER_IMAGE%"

                        ssh -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "sudo docker stop shortnews_container || true"

                        ssh -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "sudo docker rm shortnews_container || true"

                        ssh -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "sudo docker run -d -p 80:80 --name shortnews_container %DOCKER_IMAGE%"
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sshagent(['ec2-shortnews']) {
                    bat '''
                        ssh -o StrictHostKeyChecking=no %EC2_USER%@%EC2_HOST% "sudo docker ps"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'ShortNews deployment completed successfully.'
        }

        failure {
            echo 'ShortNews deployment failed.'
        }
    }
}