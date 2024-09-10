pipeline{
    agent{
        docker {
            image 'node:6-aplane'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages{
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }
    }   
}