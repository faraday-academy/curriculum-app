pipeline {
  agent any
  stages {
    stage('Checkout Repo') {
      steps {
        git(branch: 'dev', url: 'https://github.com/faraday-academy/curriculum-app', credentialsId: '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')
      }
    }

  }
}