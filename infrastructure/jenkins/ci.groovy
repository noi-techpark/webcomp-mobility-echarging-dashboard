pipeline {
    agent {
        dockerfile {
            filename 'infrastructure/docker/node.dockerfile'
            additionalBuildArgs '--build-arg JENKINS_USER_ID=$(id -u jenkins) --build-arg JENKINS_GROUP_ID=$(id -g jenkins)'
        }
    }
    options {
        ansiColor('xterm')
    }
    // TODO: Delete either all yarn or all npm scripts
    stages {
        stage('Dependencies') {
            steps {
                sh 'yarn'
            }
        }
        stage('Test') {
            steps {
                sh '''
                    yarn lint
                    yarn test
                '''
            }
        }
        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
    }
}
