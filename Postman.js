console.log("Postman")
let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';


//Utility function
function addbutton(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let addedParamCount = 0;
//jsonBox hide 
paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
// parameterBox hide
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})
// Add parameters using + button

let addparam = document.getElementById('addparam');
addparam.addEventListener('click', () => {
    console.log('clicked');
    let params = document.getElementById('params');
    let str = `<div class="row my-2">
    <div class="row">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
    <div class="col-sm-4">
        <input type="text" class="form-control" id="parameterKey ${addedParamCount + 2}" placeholder="key ${addedParamCount + 2}" aria-label="key 1">
    </div>
    <div class="col-sm-4">
        <input type="text" class="form-control" id="parameterValue ${addedParamCount + 2}" placeholder="Value ${addedParamCount + 2}" aria-label="Value 1">
    </div>
    <button id="addparam" class="btn btn-primary col-sm-1 deleteParam"> - </button>
    </div>`;


    let paramElement = addbutton(str);
    params.appendChild(paramElement)

    //  delete param  using - button 
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    } 
    addedParamCount++;
})

//If click on submit button
    let submit = document.getElementById('submit');
    submit.addEventListener('click', () => {
    document.getElementById('responseJsonText').value = "please wait....fetching Response.........";
    //access all value for submit button
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    console.log(url, requestType, contentType)

    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;


            }


            data = JSON.stringify(data);
        }
    }

    else {
        data = document.getElementById('requestJsonText').value;
    }


    console.log(url, requestType, contentType);
    console.log("data is", data)
    // document.getElementById('responseJsonText').value=data;

    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                let response = document.getElementById('responseJsonText').value = text;
                console.log(response)
            })
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                let response = document.getElementById('responseJsonText').value = text;
                console.log(response)
            })
    }

})

