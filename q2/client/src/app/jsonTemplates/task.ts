import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Task {
  @JsonProperty("name", String , true)
  name: string = undefined;

}
