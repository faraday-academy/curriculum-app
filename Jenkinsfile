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
        sh 'docker-compose up -f devops/docker-compose.yml'
      }
    }

  }
}