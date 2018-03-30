<template>
  <div :style="outline()">
      <div :style="outline()">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur fugit officiis cumque ratione aut doloribus officia eveniet, a quaerat atque non, explicabo dicta illum inventore exercitationem sapiente reiciendis. Quod, fugit.</div>
      <div :style="outline()">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aut quae assumenda! Blanditiis reprehenderit culpa iusto, veniam, eum porro nemo unde ipsam corrupti inventore aperiam voluptas amet natus! Enim, blanditiis!</div>
      <div :style="outline()">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci laboriosam quasi animi a consequatur enim voluptas repellat, vitae numquam distinctio totam culpa in illum? Vel quam eaque at quis quae.</div>
      <div :style="outline()">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque cupiditate dolorem ea cumque eaque accusamus ipsum, illo aut nemo ducimus a, id non facilis odio! Dolor optio iure minus ipsa?
          <div :style="outline()">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, ea. Blanditiis illum tempora, voluptatibus mollitia asperiores consequuntur animi ipsam aut dicta! Minus iusto aliquam molestiae ratione et quisquam excepturi similique.</div>
      </div>
  </div>

</template>

<script>
import Debug from '../Debug'
export default {
  methods: {
    outline () {
      return Object.assign(
        Debug.randOutline(1, 4),
        Debug.randBackgroundColor()
      )
    }
  }
}
</script>
