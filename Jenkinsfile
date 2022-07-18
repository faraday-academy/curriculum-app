pipeline {
  agent any
  stages {
    stage('Checkout Repo') {
      steps {
        git(branch: 'dev', url: 'https://github.com/faraday-academy/curriculum-app', credentialsId: 'curriculumAppGithubCreds')
        sh 'ls -l'
      }
    }

  }
}