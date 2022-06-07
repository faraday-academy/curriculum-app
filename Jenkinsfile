pipeline {
  agent any
  stages {
    stage('Clone') {
      steps {
        git(url: 'https://github.com/faraday-academy/curriculum-app', branch: 'dev')
      }
    }

    stage('Build') {
      steps {
        sh 'cd curriculum-back && docker build .'
      }
    }

  }
}