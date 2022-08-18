<template>
    <div>
        <Scroll class="content">
            <ul >
                <li>列表1</li>
                <li>列表2</li>
                <li>列表3</li>
                <li>列表4</li>
                <li>列表5</li>
                <li>列表6</li>
                <li>列表7</li>
                <li>列表8</li>
                <li>列表9</li>
                <li>列表10</li>
                <li>列表11</li>
                <li>列表12</li>
                <li>列表13</li>
                <li>列表14</li>
                <li>列表15</li>
                <li>列表16</li>
                <li>列表17</li>
                <li>列表18</li>
                <li>列表19</li>
                <li>列表20</li>
                <li>列表21</li>
                <li>列表22</li>
                <li>列表23</li>
                <li>列表24</li>
                <li>列表25</li>
                <li>列表26</li>
                <li>列表27</li>
                <li>列表28</li>
                <li>列表29</li>
                <li>列表30</li>
                <li>列表27</li>
                <li>列表28</li>
                <li>列表29</li>
                <li>列表30</li>
                <li>列表28</li>
                <li>列表29</li>
                <li>列表30</li>
                <li>列表27</li>
                <li>列表28</li>
                <li>列表29</li>
                <li>列表30</li>
            </ul>
        </Scroll>
        <BackTop @click.native="backtop"/>
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'
export default {
    name:'Category',
    data(){
        return {
        }
    },
    components:{
        BackTop,
        Scroll
    },
    methods:{
        backtop(){
            this.$refs.scroll.scrollTo(0,0);
        }
    },
    
}
</script>

<style scoped>
.content{
    height:300px;
    overflow: hidden;
    background-color: aqua;

}
</style>