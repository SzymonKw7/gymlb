function App() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'User', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            }
        }
    }

    return <div>
        <h1>Hello, world!</h1>
    </div>
}

export default App;