let alive = 'initial value';

const keepAlive = (token) => {
    alive = token;
    console.log(alive);
}

const displayToken = () => {
    console.log(alive);
}