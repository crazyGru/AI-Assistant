import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Content Rephrase",
	desc: "Rephrase your content in a different voice and style to appeal to different readers.",
	category: "Article",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "gray-500",
	toColor: "gray-500",

	to: "/ai/blog/content_rephrase",
	api: "/ai/blog/content_rephrase",

	output: {
		title: "Generated Result",
		desc: "",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"Content Rephrase",
		desc: "Rephrase your content in a different voice and style to appeal to different readers.",
		// n: 1,
		prompts: [
			{
				title: "What would you like to rewrite *", 
				attr: "rewrite",  
				value: "", 
				placeholder: "Enter your content to rewrite", 
				label: "",
				// type: "textarea",
				maxLength: 50,
				// max: 100,
				// min: 5,
				// required: true,
				error: "",
				example: "",
			},
			{
				title: "Keywords *",
				attr:"keyword",
				value:"",
				placeholder:"Keyword 1, keyword 2",
				type: "textarea",
				maxLength: 200,
				// max: 100,
				min: 3,
				required: true,
				error: "",
				example: "Hello World ",
			},
			{
				title: "Language",
				attr: "language",
				value: "English",
				options:[
					{"value": "Arabic", "label": "Arabic"},
					{"value": "Bengali", "label": "Bengali"},
					{"value": "Chinese", "label": "Chinese"},
					{"value": "Danish", "label": "Danish"},
					{"value": "Dutch", "label": "Dutch"},
					{"value": "English", "label": "English"},	
					{"value": "French", "label": "French"},
					{"value": "German", "label": "German"},
					{"value": "Hebrew", "label": "Hebrew"},
					{"value": "Hindi", "label": "Hindi"},
					{"value": "Indonesian", "label": "Indonesian"},		
					{"value": "Italian", "label": "Italian"},	
					{"value": "Japanese", "label": "Japanese"},	
					{"value": "Polish", "label": "Polish"},	
					{"value": "Romanian", "label": "Romanian"},	
					{"value": "Russian", "label": "Russian"},	
					{"value": "Spanish", "label": "Spanish"},	
					{"value": "Swedish", "label": "Swedish"},	
					{"value": "Turkish", "label": "Turkish"},	
					{"value": "Vietnamese", "label": "Vietnamese"},	
					{"value": "Bangla", "label": "Bangla"},			
				],
				type:"dropdown",
			},
			{
				title: "Quality type",
				attr: "quality",
				value: "Economy",
				options:[
					{"value": "Economy", "label": "Economy"},
					{"value": "Average", "label": "Average"},
					{"value": "Good", "label": "Good"},
					{"value": "Premium", "label": "Premium"},			
				],
				type:"dropdown",
			},
			{
				title: "Tone of Voice",
				attr: "voice",
				value: "Funny",
				options:[
					{"value": "Funny", "label": "Funny"},
					{"value": "Casual", "label": "Casual"},
					{"value": "Excited", "label": "Excited"},
					{"value": "Professional", "label": "Professional"},	
					{"value": "Witty", "label": "Witty"},
					{"value": "Sarcastic", "label": "Sarcastic"},
					{"value": "Feminine", "label": "Feminine"},
					{"value": "Masculine", "label": "Masculine"},
					{"value": "Bold", "label": "Bold"},
					{"value": "Dramatic", "label": "Dramatic"},
					{"value": "Gumpy", "label": "Gumpy"},
					{"value": "Secretive", "label": "Secretive"},				
				],
				type:"dropdown",
			},
			{
				title: "Number of Results",
				attr:"result",
				value:"1",
				options:[
					{"value": 1, "label": "1"},
					{"value": 2, "label": "2"},
					{"value": 3, "label": "3"},
					{"value": 4, "label": "4"},	
					{"value": 5, "label": "5"}		
				],
				type:"dropdown",
			},
			{
				title: "Max Results Length", 
				attr: "length",  
				value: "500", 
				placeholder: "500", 
				label: "Who the main group are you are writing for",
				// type: "textarea",
				maxLength: 10,
				// max: 100,
				// min: 5,
				// required: true,
				error: "",
				example: "",
			},
			// options: [{ title: "2nd Grader", value: "2nd Grader", desc: "Explain this like I'm 5 years old", Icon: AnnotationIcon },],
				
		],
		example: {
			output: "Hello World Hello World Hello World Hello World Hello World Hello World Hello World ",
			// outputs: [
			// 	"The sun is very old, over 4.5 billion years",
			// 	"At 10,000 degrees, sun is also very hot",
			// 	"Gasses called coronal mass ejections erupt from the sun",
			// ],
			// Icon: RefreshIcon,
			color: "blue",
		}
	}]
		
}

export default obj

