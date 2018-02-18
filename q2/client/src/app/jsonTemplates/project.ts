import { JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Project {

  // what the json object name will be, what type it should expect, and if it is required or not.
  // Recommend to keep both the @JsonProperty and variable name the same to makes it easier.
  @JsonProperty("name", String, true)
  name: string = undefined;   // what you want to have this class use. could have been pokemon: string = undefined
  @JsonProperty("description", String, false)
  description: string = undefined;

  /*
  Example of how later on we can nest other json object interfaces into eachother.
  Must put 'import { Task } from "./task"' however up top.
  @JsonProperty("tasks", [Task], false)
  tasks: Task[] = undefined;
   */

}

/*
  The "name" here is what goes inside of the @JsonProperty above.
  json = [
    {
      "name":"test project",
      "description":"This is cool!"
    }
  ]
 */
