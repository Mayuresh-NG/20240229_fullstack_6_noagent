let bulbstatus = "ON";

var binary = "1" 
var digit = binary.toString(10); 


if(digit % 3 == 0)
{
    console.log("ON");
}
else
{
    console.log("OFF");
}