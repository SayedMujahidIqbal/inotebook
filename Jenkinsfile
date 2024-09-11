pipeline{
    agent any
        stages{
            stage('Build'){
                steps{
                    script{
                        MY_CONTAINER= bat(script: '@docker run -d -i node:6-alpine', returnStdout: true).trim()
                        echo "mycontainer_id id ${MY_CONTAINER}"
                        bat "docker exec ${MY_CONTAINER} node --version"
                        bat "docker rm -f ${MY_CONTAINER}"                        
                    }
                }
            }
            stage('test'){
                steps {
                    script{
                        bat "node --version"
                    }
                }
            }
            stage('Deliver') {
                steps {
                    script{
                        bat '/jenkins/scripts/deliver.bat'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                        bat '/jenkins/scripts/kill.bat'
                    }
                }
            }
        }
}