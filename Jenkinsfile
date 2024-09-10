pipeline{
    stages{
        stage('Build'){
            agent{
                docker{
                    image 'node:6-aplane'
                    reuseNode true
                }
            }
            steps{
                sh 'npm install'
            }
        }
    }   
}