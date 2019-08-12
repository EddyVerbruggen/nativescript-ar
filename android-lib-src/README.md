### Creating a new jar lib project
* Android Studio: New Project, then add new Module

### Opening the project
In Android Studio, select the option to open an existing project.

### Building the lib
* Gradle toolwindow > ar > Tasks > other > buildAndCopy
* ^ Then save that run config, and change "Tasks:" to "clean buildAndCopy"

This copies the aar to the src folder.
