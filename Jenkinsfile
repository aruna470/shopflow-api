pipeline {
  agent any
  stages {
    stage('dev') {
      steps {
        build 'shopflow-api-dev'
      }
    }
    stage('dev-approval') {
      steps {
        input 'Proceed to staging?'
      }
    }
    stage('staging') {
      steps {
        build 'shopflow-api-staging'
      }
    }
    stage('staging-approval') {
      steps {
        input 'Proceed to UAT?'
      }
    }
    stage('UAT') {
      steps {
        build 'shopflow-api-uat'
      }
    }
  }
}