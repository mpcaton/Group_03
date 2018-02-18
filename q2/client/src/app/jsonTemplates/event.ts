import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Event {
  @JsonProperty("name", String, true)
  name: string = undefined;
}
