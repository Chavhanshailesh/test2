pipeline{
    agent any
    environment{
				VERSION = "${BUILD_ID}"
				REPO_NAME = 'shaileshrc'
				IMAGE_NAME = 'frontend'
				ECR_URL = '387637752303.dkr.ecr.us-east-1.amazonaws.com'
				GIT_URL = 'https://github.com/Chavhanshailesh/test1.git'
		
    }
    stages{
		stage('Git Checkout'){
			steps{
				git "${GIT_URL}"
				sh 'ls'
			}
		}

        stage('Docker Build'){
            steps{
				sh "docker build . -t ${REPO_NAME}/${IMAGE_NAME}:${VERSION} "
            }

        }
		stage('ECR Push'){
			steps{
				withCredentials([string(credentialsId: 'dkr-hub', variable: 'DockerHubPass')]) {
					sh "docker login -u shaileshrc  -p ${DockerHubPass}"   
				}
				sh 'docker push ${REPO_NAME}/${IMAGE_NAME}:${VERSION}'
			}
				
			
		}
	}
	post{
		always{
			// make sure that the Docker image is removed
			sh "docker rmi ${REPO_NAME}/${IMAGE_NAME}:${VERSION} | true"
		}
	}
  
}