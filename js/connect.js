var intmpudata;
var client = new Messaging.Client("broker.hivemq.com", 8000, "myclientid_" + parseInt(Math.random() * 100, 10));

//Gets  called if the websocket/mqtt connection gets disconnected for any reason
client.onConnectionLost = function (responseObject) {
    //Depending on your scenario you could implement a reconnect logic here
    alert("connection lost: " + responseObject.errorMessage);
};

//Connect Options
var options = {
    timeout: 3,
    //Gets Called if the connection has sucessfully been established
    onSuccess: function () {
        alert("Connected");
    },
    //Gets Called if the connection could not be established
    onFailure: function (message) {
        alert("Connection failed: " + message.errorMessage);
    }
};

//Creates a new Messaging.Message Object and sends it to the HiveMQ MQTT Broker
var publish = function (payload, topic, qos) {
    //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
    var message = new Messaging.Message(payload);
    message.destinationName = topic;
    message.qos = qos;
    client.send(message);
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

//Chart
var canvas = document.getElementById('myChart');
var data = {
labels: [],
datasets: [
    {
        label: "Deflection",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data:[],
    }
],
};



var option = {
showLines: true
};
var myLineChart = Chart.Line(canvas,{
data:data,
options:option
});


//Gets called whenever you receive a message for your subscriptions
client.onMessageArrived = function (message) {
    //Do something with the push message you received
     // $("#messages").append(message.payloadString +" ");
     currentTime();
           intmpudata = parseInt(message.payloadString);
           var xaxisstring = m.toString();
           var yaxisstring = h.toString();
           var xylabel = yaxisstring + " :" + xaxisstring;
           addData(myLineChart,xylabel,intmpudata);
document.getElementById("messages").innerHTML= message.payloadString;
    client.unsubscribe("chart/topic");
};
