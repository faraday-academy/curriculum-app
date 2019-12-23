# Curriculum App

This app allows users to create their own learning curriculum. They can then keep track of their progress, share it with friends, and make changes as they go along.

To see the playlist where I livestream the building of this app, [click here](https://www.youtube.com/playlist?list=PLFBirL3MAv2-c8VpBJMvH8Hci975MLVU1).

## Table of Contents

1. [Mockups](#mockups)
1. [Schema](#schema)
1. [Running Locally](#running-locally)
1. [MVP Features](#mvp-features)
1. [Version 1 Features](#version-1-features)
1. [Tech Stack](#tech-stack)
1. Initial, Front-end TODOs

## Mockups

<p align="center">
  <img src="https://github.com/gwenf/curriculum-app/blob/master/Home%20Page.png" alt="Home Page Mockup">
</p>

<p align="center">
  <img src="https://github.com/gwenf/curriculum-app/blob/master/Create_update%20curriculum.png" alt="Create or Update Page Mockup">
</p>

<p align="center">
  <img src="https://github.com/gwenf/curriculum-app/blob/master/Display%20Curriculum.png" alt="Display Curriculum Page Mockup">
</p>

## Schema

**curricula**

* id: UUID (pk)
* name: string
* goal: string
* description: string
* sections: [object]
    * name: string
    * resources: [string]
    * projects: [string]

## Running Locally

1. Clone this repo
1. `cd curriculum-front`
1. `npm i`
1. `npm run serve`

## MVP Features

1. Home Page with list of curriculums
1. Form Page to create/update a curriculum
1. User can delete a curriculum

## Version 1 Features

1. Users can log in and save their curricula
1. Users can fork other users curricula

## Tech Stack

1. Vue.js/Vue Router/Vuex
1. Vuetify
1. Node.js/Express.js
1. MongoDB/Mongoose (subject to change)
1. Digital Ocean (hosting)

## Front-end/initial TODOs

1. Map out schema
1. Set up front-end
1. Create home page
1. Create curriculum view page
1. Create curriculum form page

