export const colors = {
    blue: "#0000FF",
    marineBlue: "#00FFFF",
    green: "#00FF00",
    yellow: "#FFFF00",
    red: "#FF0000",
    orange: "#FFA500",
    black: "#000000",
    gray: "#808080",
    lightGray: "#C2C2C2",
    white: "#FFFFFF",
    darkGreen: "#008000",
    overlapGreen: "#7FFD80",    //color that match with the corresponding overlap colors effects
    noOverlapGreen: "#BEFCBF",
    overlapChartGreen: "#9EFCA0",
};

export const colorsList = [
    colors.blue,
    colors.marineBlue,
    colors.green,
    colors.yellow,
    colors.red,
    colors.orange,
    "#C71585",
    colors.darkGreen,
    "#800000",
    "#008080",
    "#000080",
    "#FF00FF",
    "#800080",
    "#CD5C5C",
    "#C0C0C0",
    colors.gray,
    colors.black,
    "#DC143C",
    "#FFC0CB",
    "#FF69B4",
    "#FF4500",
    "#FFD700",
    "#F0E68C",
    "#BDB76B",
    "#BA55D3",
    "#9370DB",
    "#9400D3",
    "#ADFF2F",
    "#2E8B57",
    "#CD853F",
    "#AFEEEE",
    "#40E0D0",
];

export const rangesByConfigurationColors = {
    'blue-min': colors.blue,
    'red-min': colors.red,
    'yellow-min': colors.yellow,
    'green': colors.green,
    'yellow-max': colors.yellow,
    'red-max': colors.red
}

export const getColors = function*() {
    let currentColor = 0;
    while (true) {
        yield colorsList[(currentColor++) % colorsList.length];
    }
}