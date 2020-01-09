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
				stage('promotion'){
					steps{
							timeout(time: 1, unit: "MINUTES") {
								//	input message: 'Do you want to approve the push in ecr repo', ok: 'Yes'
								verify()
								echo 'push to ecr'
							}
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
				stage('Download') {
					steps {
						sh 'mkdir js'
						sh 'echo "not a artifact file" > js/build.js'
						sh 'echo "artifact file" > js/build.min.js'
						
						sh 'mkdir css'
						sh 'echo "not a artifact file" > css/build.css'
						sh 'echo "artifact file" > css/build.min.css'
					}
				}	
				
			}
			post{
						always{
							// make sure that the Docker image is removed
							sh "docker rmi ${REPO_NAME}/${IMAGE_NAME}:${VERSION} | true"
							archiveArtifacts artifacts: '**/*.min.*', onlyIfSuccessful: true
						}
						
				}
	
	}
	def verify() {
		stage('Verify') {
			def userInput = input(
				id: 'userInput', message: 'PUSH to ECR', parameters: [
				[$class: 'BooleanParameterDefinition', defaultValue: false, description: '', name: 'Please confirm you sure to proceed']
			])

			if(!userInput) {
				error "Build wasn't confirmed"
			}
		}
	}

  
