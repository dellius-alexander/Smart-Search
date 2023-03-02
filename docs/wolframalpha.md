


```
APP NAME: Smart Search

APPID: 96A2G3-Q24J3WVEWY

USAGE TYPE: Personal/Non-commercial Only

Max-Request: 2,000

API Request: https://api.wolframalpha.com/v2/query?input=what+is+newtons+first+law?&format=image,plaintext,html&output=JSON&appid=DEMO


NOTE:

An AppID must be supplied in all calls to the Wolfram|Alpha API. If you have multiple applications using the Wolfram|Alpha API, each must have its own AppID.

Read the API Documentation for more information.

The maximum numbers of Apps is 20 by default. Please contact us for details.
```



```JSON
{
	"queryresult":{
		"success":true,
		"error":false,
		"numpods":7,
		"datatypes":"FamousPhysicsProblem",
		"timedout":"",
		"timedoutpods":"",
		"timing":0.686,
		"parsetiming":0.305,
		"parsetimedout":false,
		"recalculate":"",
		"id":"MSP372014b7id6b06240ggd00006526b51h23aah244",
		"host":"https:\/\/www6b3.wolframalpha.com",
		"server":"16",
		"related":"https:\/\/www6b3.wolframalpha.com\/api\/v1\/relatedQueries.jsp?id=MSPa372114b7id6b06240ggd00002498a8045e3f845e8350669649384844499",
		"version":"2.6",
		"inputstring":"what is newton first law",
		"pods":[
			{
				"title":"Input interpretation",
				"scanner":"Identity",
				"id":"Input",
				"position":100,
				"error":false,
				"numsubpods":1,
				"subpods":[
					{
						"title":"",
						"plaintext":"Newton's first law (physical principle)"
					}
				],
				"expressiontypes":{
					"name":"Default"
				}
			},
			{
				"title":"Description",
				"scanner":"Data",
				"id":"StatementPod:FamousPhysicsProblem",
				"position":200,
				"error":false,
				"numsubpods":1,
				"subpods":[
					{
						"title":"",
						"microsources":{
							"microsource":"FamousPhysicsProblem"
						},
						"plaintext":"Newton's first law states that a body at rest remains at rest and a body in uniform motion remains in uniform motion unless acted upon by an external unbalanced force."
					}
				],
				"expressiontypes":{
					"name":"Default"
				}
			},
			{
				"title":"Alternate description",
				"scanner":"Data",
				"id":"AlternateStatementsPod:FamousPhysicsProblem",
				"position":300,
				"error":false,
				"numsubpods":1,
				"subpods":[
					{
						"title":"",
						"microsources":{
							"microsource":"FamousPhysicsProblem"
						},
						"plaintext":"There exists a set of inertial reference frames relative to which all particles with no net force acting on them will move without change in their velocity.\nA body persists in a state of rest or of uniform motion unless acted upon by an external unbalanced force."
					}
				],
				"expressiontypes":{
					"name":"Default"
				}
			},
			{
				"title":"Alternate name",
				"scanner":"Data",
				"id":"AlternateNamesPod:FamousPhysicsProblem",
				"position":400,
				"error":false,
				"numsubpods":1,
				"subpods":[
					{
						"title":"",
						"microsources":{
							"microsource":"FamousPhysicsProblem"
						},
						"plaintext":"law of inertia"
					}
				],
				"expressiontypes":{
					"name":"Grid"
				}
			},
			{
				"title":"History",
				"scanner":"Data",
				"id":"HistoryPod:FamousPhysicsProblem",
				"position":500,
				"error":false,
				"numsubpods":1,
				"subpods":[
					{
						"title":"",
						"microsources":{
							"microsource":"FamousPhysicsProblem"
						},
						"plaintext":"formulation date | 1687 (336 years ago)\nformulator | Isaac Newton"
					}
				],
				"expressiontypes":{
					"name":"Grid"
				},
				"states":[
					{
						"name":"More",
						"input":"HistoryPod:FamousPhysicsProblem__More"
					}
				]
			},
			{
				"title":"Limitations",
				"scanner":"Data",
				"id":"LimitationsPod:FamousPhysicsProblem",
				"position":600,
				"error":false,
				"numsubpods":1,
				"subpods":[
					{
						"title":"",
						"microsources":{
							"microsource":"FamousPhysicsProblem"
						},
						"plaintext":"Agrees well with experiments for classical mechanics, but may require more sophisticated formulations such as special relativity, general relativity, or relativistic quantum mechanics for small scales, large speeds, or strong gravitational fields."
					}
				],
				"expressiontypes":{
					"name":"Default"
				}
			},
			{
				"title":"Classes",
				"scanner":"Data",
				"id":"PropertiesPod:FamousPhysicsProblem",
				"position":700,
				"error":false,
				"numsubpods":1,
				"subpods":[
					{
						"title":"",
						"microsources":{
							"microsource":"FamousPhysicsProblem"
						},
						"plaintext":"laws of physics | Newton's laws | Newton's laws of motion"
					}
				],
				"expressiontypes":{
					"name":"Default"
				}
			}
		],
		"assumptions":{
			"type":"Clash",
			"word":"newton first law",
			"template":"Assuming \"${word}\" is ${desc1}. Use as ${desc2} instead",
			"count":2,
			"values":[
				{
					"name":"FamousPhysicsProblem",
					"desc":" referring to a physical principle",
					"input":"*C.newton+first+law-_*FamousPhysicsProblem-"
				},
				{
					"name":"PhysicalEffect",
					"desc":" referring to physical effect",
					"input":"*C.newton+first+law-_*PhysicalEffect-"
				}
			]
		},
		"sources":{
			"url":"https:\/\/www6b3.wolframalpha.com\/sources\/FamousPhysicsProblemSourceInformationNotes.html",
			"text":"Famous physics problem"
		}
	}
}
```