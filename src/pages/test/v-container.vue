<template>
  <v-container>
    <div>
      使用 v-container、v-row 和 v-col 组件来创建一个响应式的布局，并结合 v-card
      组件来实现类似 Dashboard
      的卡片样式。以下是一个示例，展示如何实现固定大小的卡片，并根据屏幕大小自动断行。
    </div>
    <!-- 使用 v-row 创建行 -->
    <v-row>
      <!-- 使用 v-col 创建列，设置响应式布局 -->
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <!-- 使用 v-card 创建卡片 -->
        <!-- 固定卡片宽度 -->
        <v-card class="mx-auto" max-width="300">
          <!-- 卡片图片 -->
          <v-img
            src="https://via.placeholder.com/300"
            height="200px"
            cover
          ></v-img>

          <v-card-title>卡片标题 {{ index + 1 }}</v-card-title>

          <v-card-text>
            这是卡片的内容。卡片大小固定，排版会根据屏幕大小自动断行。
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary">操作按钮</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const cards = [
    { title: "a", },
    { title: "b", },
    { title: "c", },
    { title: "d", },
    { title: "e", },
    { title: "f", },
    { title: "g", },
    { title: "h", },
    { title: "i", },
    { title: "j", },
    { title: "k", },
    { title: "l", },
]
</script>
