import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class Role {
  @JsonProperty("name", String, true)
  name: string = undefined;

  // green, red, blue etc. At some point having a basic color picker (like 10 options or so)
  // with options from material css wouldnt be bad
  @JsonProperty("color", String, false)
  color: string = undefined;
}
