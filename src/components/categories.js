import AuthorsOn from "../assets/Elements/Authors/On.png"
import AuthorsOff from "../assets/Elements/Authors/Off.png"

import Categorieson from "../assets/Elements/Categories/On.png"
import CategoriesOff from "../assets/Elements/Categories/Off.png"

import EpisodesOn from "../assets/Elements/Episodes/On.png"
import EpisodesOff from "../assets/Elements/Episodes/Off.png"

import PodcastsOn from "../assets/Elements/Podcasts/On.png"
import PodcastsOff from "../assets/Elements/Podcasts/Off.png"

import TopicsOn from "../assets/Elements/Topics/On.png"
import TopicsOff from "../assets/Elements/Topics/Off.png"

const List = [
    {
        name: "Authors",
        imageOn: AuthorsOn,
        imageOff: AuthorsOff,
        isActive: true,
    },
    {
        name: "Categories",
        imageOn: Categorieson,
        imageOff: CategoriesOff,
        isActive: false,
    },
    {
        name: "Episodes",
        imageOn: EpisodesOn,
        imageOff: EpisodesOff,
        isActive: false,
    },
    {
        name: "Podcasts",
        imageOn: PodcastsOn,
        imageOff: PodcastsOff,
        isActive: false,
    },
    {
        name: "Topics",
        imageOn: TopicsOn,
        imageOff: TopicsOff,
        isActive: false,
    },
]

export default List