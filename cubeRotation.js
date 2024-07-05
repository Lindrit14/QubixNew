const rotateFaceClockwise = (face) => {
    return [
        face[6], face[3], face[0],
        face[7], face[4], face[1],
        face[8], face[5], face[2]
    ];
};

const rotateFaceCounterClockwise = (face) => {
    return [
        face[2], face[5], face[8],
        face[1], face[4], face[7],
        face[0], face[3], face[6]
    ];
};

const rotateFace180 = (face) => {
    return [
        face[8], face[7], face[6],
        face[5], face[4], face[3],
        face[2], face[1], face[0]
    ];
};

const rotateRight = (cube) => {
    const newCube = { ...cube };
    newCube.R = rotateFaceClockwise(cube.R);

    const tempU = [cube.U[2], cube.U[5], cube.U[8]];
    const tempF = [cube.F[2], cube.F[5], cube.F[8]];
    const tempD = [cube.D[2], cube.D[5], cube.D[8]];
    const tempB = [cube.B[6], cube.B[3], cube.B[0]];

    newCube.U[2] = tempF[0];
    newCube.U[5] = tempF[1];
    newCube.U[8] = tempF[2];

    newCube.F[2] = tempD[0];
    newCube.F[5] = tempD[1];
    newCube.F[8] = tempD[2];

    newCube.D[2] = tempB[0];
    newCube.D[5] = tempB[1];
    newCube.D[8] = tempB[2];

    newCube.B[6] = tempU[2];
    newCube.B[3] = tempU[1];
    newCube.B[0] = tempU[0];

    return newCube;
};

const rotateRightInverse = (cube) => {
    const newCube = { ...cube };
    newCube.R = rotateFaceCounterClockwise(cube.R);

    const tempU = [cube.U[2], cube.U[5], cube.U[8]];
    const tempF = [cube.F[2], cube.F[5], cube.F[8]];
    const tempD = [cube.D[2], cube.D[5], cube.D[8]];
    const tempB = [cube.B[6], cube.B[3], cube.B[0]];

    newCube.U[2] = tempB[0];
    newCube.U[5] = tempB[1];
    newCube.U[8] = tempB[2];

    newCube.F[2] = tempU[0];
    newCube.F[5] = tempU[1];
    newCube.F[8] = tempU[2];

    newCube.D[2] = tempF[0];
    newCube.D[5] = tempF[1];
    newCube.D[8] = tempF[2];

    newCube.B[6] = tempD[2];
    newCube.B[3] = tempD[1];
    newCube.B[0] = tempD[0];

    return newCube;
};

const rotateRight180 = (cube) => {
    return rotateRight(rotateRight(cube));
};

const rotateUp = (cube) => {
    const newCube = { ...cube };
    newCube.U = rotateFaceClockwise(cube.U);

    const tempF = [cube.F[0], cube.F[1], cube.F[2]];
    const tempR = [cube.R[0], cube.R[1], cube.R[2]];
    const tempB = [cube.B[0], cube.B[1], cube.B[2]];
    const tempL = [cube.L[0], cube.L[1], cube.L[2]];

    newCube.F[0] = tempR[0];
    newCube.F[1] = tempR[1];
    newCube.F[2] = tempR[2];

    newCube.R[0] = tempB[0];
    newCube.R[1] = tempB[1];
    newCube.R[2] = tempB[2];

    newCube.B[0] = tempL[0];
    newCube.B[1] = tempL[1];
    newCube.B[2] = tempL[2];

    newCube.L[0] = tempF[0];
    newCube.L[1] = tempF[1];
    newCube.L[2] = tempF[2];

    return newCube;
};

const rotateUpInverse = (cube) => {
    const newCube = { ...cube };
    newCube.U = rotateFaceCounterClockwise(cube.U);

    const tempF = [cube.F[0], cube.F[1], cube.F[2]];
    const tempR = [cube.R[0], cube.R[1], cube.R[2]];
    const tempB = [cube.B[0], cube.B[1], cube.B[2]];
    const tempL = [cube.L[0], cube.L[1], cube.L[2]];

    newCube.F[0] = tempL[0];
    newCube.F[1] = tempL[1];
    newCube.F[2] = tempL[2];

    newCube.R[0] = tempF[0];
    newCube.R[1] = tempF[1];
    newCube.R[2] = tempF[2];

    newCube.B[0] = tempR[0];
    newCube.B[1] = tempR[1];
    newCube.B[2] = tempR[2];

    newCube.L[0] = tempB[0];
    newCube.L[1] = tempB[1];
    newCube.L[2] = tempB[2];

    return newCube;
};

const rotateUp180 = (cube) => {
    return rotateUp(rotateUp(cube));
};

const rotateFront = (cube) => {
    const newCube = { ...cube };
    newCube.F = rotateFaceClockwise(cube.F);

    const tempU = [cube.U[6], cube.U[7], cube.U[8]];
    const tempR = [cube.R[0], cube.R[3], cube.R[6]];
    const tempD = [cube.D[0], cube.D[1], cube.D[2]];
    const tempL = [cube.L[2], cube.L[5], cube.L[8]];

    newCube.U[6] = tempL[2];
    newCube.U[7] = tempL[1];
    newCube.U[8] = tempL[0];

    newCube.R[0] = tempU[2];
    newCube.R[3] = tempU[1];
    newCube.R[6] = tempU[0];

    newCube.D[0] = tempR[0];
    newCube.D[1] = tempR[1];
    newCube.D[2] = tempR[2];

    newCube.L[2] = tempD[2];
    newCube.L[5] = tempD[1];
    newCube.L[8] = tempD[0];

    return newCube;
};

const rotateFrontInverse = (cube) => {
    const newCube = { ...cube };
    newCube.F = rotateFaceCounterClockwise(cube.F);

    const tempU = [cube.U[6], cube.U[7], cube.U[8]];
    const tempR = [cube.R[0], cube.R[3], cube.R[6]];
    const tempD = [cube.D[0], cube.D[1], cube.D[2]];
    const tempL = [cube.L[2], cube.L[5], cube.L[8]];

    newCube.U[6] = tempR[2];
    newCube.U[7] = tempR[1];
    newCube.U[8] = tempR[0];

    newCube.R[0] = tempD[0];
    newCube.R[3] = tempD[1];
    newCube.R[6] = tempD[2];

    newCube.D[0] = tempL[2];
    newCube.D[1] = tempL[1];
    newCube.D[2] = tempL[0];

    newCube.L[2] = tempU[2];
    newCube.L[5] = tempU[1];
    newCube.L[8] = tempU[0];

    return newCube;
};

const rotateFront180 = (cube) => {
    return rotateFront(rotateFront(cube));
};

const rotateLeft = (cube) => {
    const newCube = { ...cube };
    newCube.L = rotateFaceClockwise(cube.L);

    const tempU = [cube.U[0], cube.U[3], cube.U[6]];
    const tempF = [cube.F[0], cube.F[3], cube.F[6]];
    const tempD = [cube.D[0], cube.D[3], cube.D[6]];
    const tempB = [cube.B[8], cube.B[5], cube.B[2]];

    newCube.U[0] = tempB[0];
    newCube.U[3] = tempB[1];
    newCube.U[6] = tempB[2];

    newCube.F[0] = tempU[0];
    newCube.F[3] = tempU[1];
    newCube.F[6] = tempU[2];

    newCube.D[0] = tempF[0];
    newCube.D[3] = tempF[1];
    newCube.D[6] = tempF[2];

    newCube.B[8] = tempD[2];
    newCube.B[5] = tempD[1];
    newCube.B[2] = tempD[0];

    return newCube;
};

const rotateLeftInverse = (cube) => {
    const newCube = { ...cube };
    newCube.L = rotateFaceCounterClockwise(cube.L);

    const tempU = [cube.U[0], cube.U[3], cube.U[6]];
    const tempF = [cube.F[0], cube.F[3], cube.F[6]];
    const tempD = [cube.D[0], cube.D[3], cube.D[6]];
    const tempB = [cube.B[8], cube.B[5], cube.B[2]];

    newCube.U[0] = tempF[0];
    newCube.U[3] = tempF[1];
    newCube.U[6] = tempF[2];

    newCube.F[0] = tempD[0];
    newCube.F[3] = tempD[1];
    newCube.F[6] = tempD[2];

    newCube.D[0] = tempB[2];
    newCube.D[3] = tempB[1];
    newCube.D[6] = tempB[0];

    newCube.B[8] = tempU[0];
    newCube.B[5] = tempU[1];
    newCube.B[2] = tempU[2];

    return newCube;
};

const rotateLeft180 = (cube) => {
    return rotateLeft(rotateLeft(cube));
};

const rotateDown = (cube) => {
    const newCube = { ...cube };
    newCube.D = rotateFaceClockwise(cube.D);

    const tempF = [cube.F[6], cube.F[7], cube.F[8]];
    const tempR = [cube.R[6], cube.R[7], cube.R[8]];
    const tempB = [cube.B[6], cube.B[7], cube.B[8]];
    const tempL = [cube.L[6], cube.L[7], cube.L[8]];

    newCube.F[6] = tempL[0];
    newCube.F[7] = tempL[1];
    newCube.F[8] = tempL[2];

    newCube.R[6] = tempF[0];
    newCube.R[7] = tempF[1];
    newCube.R[8] = tempF[2];

    newCube.B[6] = tempR[0];
    newCube.B[7] = tempR[1];
    newCube.B[8] = tempR[2];

    newCube.L[6] = tempB[0];
    newCube.L[7] = tempB[1];
    newCube.L[8] = tempB[2];

    return newCube;
};

const rotateDownInverse = (cube) => {
    const newCube = { ...cube };
    newCube.D = rotateFaceCounterClockwise(cube.D);

    const tempF = [cube.F[6], cube.F[7], cube.F[8]];
    const tempR = [cube.R[6], cube.R[7], cube.R[8]];
    const tempB = [cube.B[6], cube.B[7], cube.B[8]];
    const tempL = [cube.L[6], cube.L[7], cube.L[8]];

    newCube.F[6] = tempR[0];
    newCube.F[7] = tempR[1];
    newCube.F[8] = tempR[2];

    newCube.R[6] = tempB[0];
    newCube.R[7] = tempB[1];
    newCube.R[8] = tempB[2];

    newCube.B[6] = tempL[0];
    newCube.B[7] = tempL[1];
    newCube.B[8] = tempL[2];

    newCube.L[6] = tempF[0];
    newCube.L[7] = tempF[1];
    newCube.L[8] = tempF[2];

    return newCube;
};

const rotateDown180 = (cube) => {
    return rotateDown(rotateDown(cube));
};

const rotateBack = (cube) => {
    const newCube = { ...cube };
    newCube.B = rotateFaceClockwise(cube.B);

    const tempU = [cube.U[0], cube.U[1], cube.U[2]];
    const tempR = [cube.R[2], cube.R[5], cube.R[8]];
    const tempD = [cube.D[6], cube.D[7], cube.D[8]];
    const tempL = [cube.L[0], cube.L[3], cube.L[6]];

    newCube.U[0] = tempR[2];
    newCube.U[1] = tempR[1];
    newCube.U[2] = tempR[0];

    newCube.R[2] = tempD[0];
    newCube.R[5] = tempD[1];
    newCube.R[8] = tempD[2];

    newCube.D[6] = tempL[0];
    newCube.D[7] = tempL[1];
    newCube.D[8] = tempL[2];

    newCube.L[0] = tempU[2];
    newCube.L[3] = tempU[1];
    newCube.L[6] = tempU[0];

    return newCube;
};

const rotateBackInverse = (cube) => {
    const newCube = { ...cube };
    newCube.B = rotateFaceCounterClockwise(cube.B);

    const tempU = [cube.U[0], cube.U[1], cube.U[2]];
    const tempR = [cube.R[2], cube.R[5], cube.R[8]];
    const tempD = [cube.D[6], cube.D[7], cube.D[8]];
    const tempL = [cube.L[0], cube.L[3], cube.L[6]];

    newCube.U[0] = tempL[2];
    newCube.U[1] = tempL[1];
    newCube.U[2] = tempL[0];

    newCube.R[2] = tempU[0];
    newCube.R[5] = tempU[1];
    newCube.R[8] = tempU[2];

    newCube.D[6] = tempR[0];
    newCube.D[7] = tempR[1];
    newCube.D[8] = tempR[2];

    newCube.L[0] = tempD[0];
    newCube.L[3] = tempD[1];
    newCube.L[6] = tempD[2];

    return newCube;
};

const rotateBack180 = (cube) => {
    return rotateBack(rotateBack(cube));
};

const rotateMiddle = (cube) => {
    const newCube = { ...cube };

    const tempU = [cube.U[1], cube.U[4], cube.U[7]];
    const tempF = [cube.F[1], cube.F[4], cube.F[7]];
    const tempD = [cube.D[1], cube.D[4], cube.D[7]];
    const tempB = [cube.B[7], cube.B[4], cube.B[1]];

    newCube.U[1] = tempB[0];
    newCube.U[4] = tempB[1];
    newCube.U[7] = tempB[2];

    newCube.F[1] = tempU[0];
    newCube.F[4] = tempU[1];
    newCube.F[7] = tempU[2];

    newCube.D[1] = tempF[0];
    newCube.D[4] = tempF[1];
    newCube.D[7] = tempF[2];

    newCube.B[7] = tempD[0];
    newCube.B[4] = tempD[1];
    newCube.B[1] = tempD[2];

    return newCube;
};

const rotateMiddleInverse = (cube) => {
    const newCube = { ...cube };

    const tempU = [cube.U[1], cube.U[4], cube.U[7]];
    const tempF = [cube.F[1], cube.F[4], cube.F[7]];
    const tempD = [cube.D[1], cube.D[4], cube.D[7]];
    const tempB = [cube.B[7], cube.B[4], cube.B[1]];

    newCube.U[1] = tempF[0];
    newCube.U[4] = tempF[1];
    newCube.U[7] = tempF[2];

    newCube.F[1] = tempD[0];
    newCube.F[4] = tempD[1];
    newCube.F[7] = tempD[2];

    newCube.D[1] = tempB[0];
    newCube.D[4] = tempB[1];
    newCube.D[7] = tempB[2];

    newCube.B[7] = tempU[0];
    newCube.B[4] = tempU[1];
    newCube.B[1] = tempU[2];

    return newCube;
};

const rotateMiddle180 = (cube) => {
    return rotateMiddle(rotateMiddle(cube));
};

const rotateEquatorial = (cube) => {
    const newCube = { ...cube };

    const tempF = [cube.F[3], cube.F[4], cube.F[5]];
    const tempR = [cube.R[3], cube.R[4], cube.R[5]];
    const tempB = [cube.B[3], cube.B[4], cube.B[5]];
    const tempL = [cube.L[3], cube.L[4], cube.L[5]];

    newCube.F[3] = tempL[0];
    newCube.F[4] = tempL[1];
    newCube.F[5] = tempL[2];

    newCube.R[3] = tempF[0];
    newCube.R[4] = tempF[1];
    newCube.R[5] = tempF[2];

    newCube.B[3] = tempR[0];
    newCube.B[4] = tempR[1];
    newCube.B[5] = tempR[2];

    newCube.L[3] = tempB[0];
    newCube.L[4] = tempB[1];
    newCube.L[5] = tempB[2];

    return newCube;
};

const rotateEquatorialInverse = (cube) => {
    const newCube = { ...cube };

    const tempF = [cube.F[3], cube.F[4], cube.F[5]];
    const tempR = [cube.R[3], cube.R[4], cube.R[5]];
    const tempB = [cube.B[3], cube.B[4], cube.B[5]];
    const tempL = [cube.L[3], cube.L[4], cube.L[5]];

    newCube.F[3] = tempR[0];
    newCube.F[4] = tempR[1];
    newCube.F[5] = tempR[2];

    newCube.R[3] = tempB[0];
    newCube.R[4] = tempB[1];
    newCube.R[5] = tempB[2];

    newCube.B[3] = tempL[0];
    newCube.B[4] = tempL[1];
    newCube.B[5] = tempL[2];

    newCube.L[3] = tempF[0];
    newCube.L[4] = tempF[1];
    newCube.L[5] = tempF[2];

    return newCube;
};

const rotateEquatorial180 = (cube) => {
    return rotateEquatorial(rotateEquatorial(cube));
};

const rotateStanding = (cube) => {
    const newCube = { ...cube };

    const tempU = [cube.U[1], cube.U[4], cube.U[7]];
    const tempF = [cube.F[1], cube.F[4], cube.F[7]];
    const tempD = [cube.D[1], cube.D[4], cube.D[7]];
    const tempB = [cube.B[7], cube.B[4], cube.B[1]];

    newCube.U[1] = tempF[0];
    newCube.U[4] = tempF[1];
    newCube.U[7] = tempF[2];

    newCube.F[1] = tempD[0];
    newCube.F[4] = tempD[1];
    newCube.F[7] = tempD[2];

    newCube.D[1] = tempB[0];
    newCube.D[4] = tempB[1];
    newCube.D[7] = tempB[2];

    newCube.B[7] = tempU[0];
    newCube.B[4] = tempU[1];
    newCube.B[1] = tempU[2];

    return newCube;
};

const rotateStandingInverse = (cube) => {
    const newCube = { ...cube };

    const tempU = [cube.U[1], cube.U[4], cube.U[7]];
    const tempF = [cube.F[1], cube.F[4], cube.F[7]];
    const tempD = [cube.D[1], cube.D[4], cube.D[7]];
    const tempB = [cube.B[7], cube.B[4], cube.B[1]];

    newCube.U[1] = tempB[2];
    newCube.U[4] = tempB[1];
    newCube.U[7] = tempB[0];

    newCube.F[1] = tempU[2];
    newCube.F[4] = tempU[1];
    newCube.F[7] = tempU[0];

    newCube.D[1] = tempF[2];
    newCube.D[4] = tempF[1];
    newCube.D[7] = tempF[0];

    newCube.B[7] = tempD[2];
    newCube.B[4] = tempD[1];
    newCube.B[1] = tempD[0];

    return newCube;
};

const rotateStanding180 = (cube) => {
    return rotateStanding(rotateStanding(cube));
};

export {
    rotateRight,
    rotateRightInverse,
    rotateRight180,
    rotateUp,
    rotateUpInverse,
    rotateUp180,
    rotateFront,
    rotateFace180,
    rotateFrontInverse,
    rotateFront180,
    rotateLeft,
    rotateLeftInverse,
    rotateLeft180,
    rotateDown,
    rotateDownInverse,
    rotateDown180,
    rotateBack,
    rotateBackInverse,
    rotateBack180,
    rotateMiddle,
    rotateMiddleInverse,
    rotateMiddle180,
    rotateEquatorial,
    rotateEquatorialInverse,
    rotateEquatorial180,
    rotateStanding,
    rotateStandingInverse,
    rotateStanding180,
};
