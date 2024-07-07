# Qubix - Rubik's Cube Solver App

Qubix is a mobile application designed to help you solve a Rubik's Cube using advanced algorithms. It supports multiple solving algorithms and provides a 3D visualization of the cube to help you track your progress.
Getting Started
Prerequisites

### Make sure you have the following software installed:
- Node.js
- Expo CLI
### Installation

#### Clone the repository:
```console
git clone https://github.com/Lindrit14/QubixNew.git
```
#### Navigate to the project directory:
```console
cd QubixNew
```
#### Install the dependencies:
```console
npm install
```
#### Running the App
```console
npx expo start
```

### Mobile Usage

- Download the Expo Go App on your phone.
- After starting the Expo server, scan the QR Code which will redirect you to the App and open the project.

### User Guide
Cube Layout

It's crucial to understand the cube's orientation to input and solve it correctly. The faces of the cube are named as follows:

    Front (F): The face you are directly looking at.
    Up (U): The face on the top.
    Left (L): The face on the left side.
    Right (R): The face on the right side.
    Back (B): The face opposite the front.
    Down (D): The face on the bottom.

![Layout](https://static.wikia.nocookie.net/speedsolving/images/3/33/Western_colors.png/revision/latest?cb=20141006211218)

#### Inputting the Cube State
- **Select Colors:** Use the color picker to select the color you want to place on the cube.
- **Color the Faces:** Tap on each square of the cube faces to color them accordingly. Ensure that each face of the cube matches the real cube you want to solve.
- **Check Solvability:** The app will automatically check if the cube state is valid and solvable. If not, adjust the colors.

#### Solving the Cube
- **Choose Solving Algorithm:** Select your preferred algorithm from the settings (We highly recommend Min2Phase instead of CFOP as for now).
- **Solve the Cube:** Click on the "Solve Cube" button. The app will calculate the solution and provide step-by-step moves to solve the cube.
- **Track Your Progress:** Follow the steps provided and track your progress using the 3D visualization.

#### Saving and Loading Progress
- **Save Progress:** On the solving screen, you can save your current cube state by pressing the "Save Progress" button.
- **Load Progress:** On the input screen, you can load a previously saved cube state by pressing the "Load Progress" button.

#### Additional Features
- **Solving History:** View your past solving attempts in the solving history.
- **Settings:** Adjust app settings and select the solving algorithm.
- **Logout:** Securely log out from your account.

### Screens
- **Login Screen**
Log in to your account using your email and password. If you don't have an account, you can register.

- **Cube Input Screen**
Input the cube state by coloring each face of the cube using the color picker. You can also reset the cube state or log out from this screen.

- **Solution Screen**
View the step-by-step solution to solve the cube. You can also save your progress and track the overall solving time.

- **Settings Screen**
View the currently logged-in user's email, access solving history, and change the solving algorithm.

## Contribution

Feel free to contribute to the project by forking the repository and submitting a pull request.
License
This project is licensed under the MIT License.
Enjoy solving your Rubik's Cube with Qubix!
