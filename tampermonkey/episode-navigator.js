// ==UserScript==
// @name         Episode-Navigator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://s.to/*
// @match        https://aniworld.to/*
// @match        https://serienstream.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const video_box = document.querySelector("div.hosterSiteVideo");

    if (video_box){
        const next_button = document.createElement("button");
        next_button.innerHTML = "Next Episode";
        const prev_button = document.createElement("button");
        prev_button.innerHTML = "Previous Episode";

        video_box.prepend(next_button);
        video_box.prepend(prev_button);

        // const current_url = window.location.href;
        const active = document.querySelectorAll("a.active");
        var season = active[0].innerHTML;
        var next_season = parseInt(season);
        var prev_season = parseInt(season);

        if (active.length == 2) {
            var episode = active[1].innerHTML;
        }

        const current_url = active[1].baseURI;


        const hoster_nav_buttons = document.querySelector("div.hosterSiteDirectNav");
        const episode_buttons = hoster_nav_buttons.querySelectorAll("ul")[1].querySelectorAll("a");
        const last_episode = episode_buttons[episode_buttons.length-1].innerHTML;
        const season_buttons = hoster_nav_buttons.querySelectorAll("ul")[0].querySelectorAll("a");
        const last_season = season_buttons[season_buttons.length-1].innerHTML;

        const prev_episode = parseInt(episode) - 1;
        var next_episode = parseInt(episode) + 1;
        if (episode == last_episode) {
            next_season += 1;
            next_episode = 1;
        }

        if (episode == 1) {
            prev_season -= 1;
        }

        next_button.addEventListener ("click", function() {
            var stripped_url = current_url.substring(0, current_url.length - episode.length - 9 - season.length);
            var new_url = stripped_url + next_season + "/episode-" + next_episode;

            if (season == last_season && episode == last_episode) {
                new_url = stripped_url+ season;
            }

            window.location.href = new_url;
            // window.location.href = current_url.substring(0, current_url.length - episode.length) + next_episode;
        });

        prev_button.addEventListener ("click", function() {
            var stripped_url = current_url.substring(0, current_url.length - episode.length - 9 - season.length);
            var new_url = "";
            if (episode == 1) {
                new_url = stripped_url + prev_season;
            } else {
                new_url = stripped_url + prev_season + "/episode-" + prev_episode;
            }

            window.location.href = new_url;
            // window.location.href = current_url.substring(0, current_url.length - episode.length) + prev_episode;
        });
    }

})();