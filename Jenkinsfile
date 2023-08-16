pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/mjadar/curriculum-app', branch: 'dev')
      }
    }

    stage('log') {
      steps {
        sh 'ls -la'
      }
    }

  }
}