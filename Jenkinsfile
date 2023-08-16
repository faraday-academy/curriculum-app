pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/mjadar/curriculum-app', branch: 'dev')
      }
    }

    stage('shell') {
      steps {
        sh 'ls -la'
      }
    }

  }
}