import React from "react";
import "./IntroductionSlide.css";
import { Slide } from "../Slide/Slide";
import { ActiveCounter } from "./ActiveCounter/ActiveCounter";
export const IntroductionSlide = () => {

    return (
        <Slide title= "911 calls - Demystified ">
            <div className="introduction_slide_content">
                <p className="introduction_text"> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc</p>
                <div className="introduction_stats">
                    <p className="stats_catch_phrase"> On 29 of April, on average, there are </p>
                    <div className="counters">
                        <ActiveCounter number={300} title="Health Emergencies"/>
                        <ActiveCounter number={100} title="Fire Emergencies"/>
                        <ActiveCounter number={1000} title="Traffic Emergencies"/>
                    </div>
                </div>
            </div>
        </Slide>
    );
};
