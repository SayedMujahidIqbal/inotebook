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
        }
}