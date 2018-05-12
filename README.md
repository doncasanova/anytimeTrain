# anytimeTrain

This was our first use of firebase and moments. I still have a flash when the table refreshes so I need to work through that. 
My biggest chalange in this project was getting the table to upadte a new entry only once. To resolve this I had to add database.ref().off() before my  database.ref().on("child_added", function (snapshot) {
        displayTrain(snapshot);
My TA helped me through this.

I used 
Bootstrap and CSS 
Firebase
