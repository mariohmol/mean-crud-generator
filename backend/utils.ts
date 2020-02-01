export const print = (msg) => {
    const ENV = process.env.ENV || 'production';
    if (ENV !== 'production') {
        console.log(msg);
    }
}