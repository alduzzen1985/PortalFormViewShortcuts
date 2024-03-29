# Portal Form View Shortcuts
Portal Form View Shortcut is a simple PCF Control to add a shortcut to the Form and Views. 
In the Portal Managment App you only need to change the following forms to render the PCF :
<ul>
  <li>Basic Form</li>
  <li>Advanced Form</li>
  <li>List Form</li>
</ul>

![PortalHelper](https://user-images.githubusercontent.com/32884589/151759570-9148948f-3147-4943-a84e-7f0f71871997.gif)


<h4>How to setup the PCF</h4>

To setup the PCF you need to do these actions :
<ol>
  <li>
  You need to create a new Solution where you edit, or you create new forms (reccomended) for the entities : Basic Form, Avanced Form and List. <br/>
  <img src="https://user-images.githubusercontent.com/32884589/150826633-0d408863-a60e-40aa-80f5-d4229e4c17e5.png" width=400/>
  </li>
  <li>
    Retrieve the Environemnt ID 
  </li>
  <li>
    Configure the PCF Control
  </li>
</ol>
  


<h4>Where I can take the PowerApps Environment ID ?</h4>

In order to use the PCD you need the Environment ID. You can retrieve the PowerApps Environment ID by following these steps :
<ul>
  <li>Open https://make.powerapps.com</li>
  <li>Open the Settings and click the link "Developer resources" <br/>
      <img src="https://user-images.githubusercontent.com/32884589/150827291-0a9de16f-5223-40ca-a2d9-cb1aa66fbbea.png" width=400 />
   </li>
   <li>Copy the Environment ID Guid<br/>
    <img src="https://user-images.githubusercontent.com/32884589/150826604-86ee993f-f741-4069-9879-846ad3ee9563.png" width=400/>
  </li>
</ul>



<h4>Configure the PCF to work with the Lists</h4>

In the entity "List" edit the Information form and switch to classic 
<br>
<br>
<img src="https://user-images.githubusercontent.com/32884589/150826686-0cce8097-40d3-4c7f-81b4-87f244aae0da.png" />
<br>
<br>
Add the field "Table Name" (Add a new field and don't change the existing one, otherwise you'll break the Form) 
<br>
<br>
<img src="https://user-images.githubusercontent.com/32884589/150826729-c5d11d1e-932d-43c9-bc84-35d3be86c251.png" />
<br/>

In the field we just added, setup the control  like in the example picture below. <br/>
<img src="https://user-images.githubusercontent.com/32884589/150826756-c613a2cd-7021-4dcd-a3f0-89c8c50db75b.png" />



<h4>To setup Basic Form / Advanced Form</h4>

Add the field "Table Name"  in the form (Add a new field and don't change the existing one, otherwise you'll break the Form) 
<br>
<img src="https://user-images.githubusercontent.com/32884589/150826778-b6c386d5-1f55-4038-a52a-ee9e2a0e9954.png">
<br>
And configure the control like in the example picture Below:
<br/>
<img src="https://user-images.githubusercontent.com/32884589/150826813-6c49ab4f-8628-46db-8871-a3ebd52ec769.png">


