const form = document.getElementById("form");
const submit = document.getElementById("submit");

function submitForm() {
      alert("post edit #2");
      const form = document.createElement("form");
      form.setAttribute("name", "weblogin_form");
      form.setAttribute("action", "http://1.1.1.1/reg.php");
      form.setAttribute("method", "POST");
      const names = ["Submit2", "autherr", "username", "password", "ssid", "url"];
      const value = ["Submit", "0", "Eduardo", "d3f4feec", "External", "http://www.aerohive.com"];
      let hiddenField;
      for(let i = 0; i < names.length; i++){
            hiddenField = document.createElement("input");
            hiddenField.setAttribute("name", names[i]);
            hiddenField.setAttribute("value", value[i]);
            hiddenField.setAttribute("type", "hidden");
            form.appendChild(hiddenField);
      }
      document.body.appendChild(form);
      form.submit();
}
