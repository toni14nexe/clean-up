<script setup lang="ts">
const tShirtsChilds = [
  {
    size: 'A',
    '4': 42,
    '6': 46,
    '8': 52,
    '10': 58,
    '12': 64
  },
  {
    size: 'C',
    '4': 33,
    '6': 36,
    '8': 40,
    '10': 42,
    '12': 44
  },
  {
    size: 'H',
    '4': 10,
    '6': 12,
    '8': 15,
    '10': 15,
    '12': 17
  }
]
const tShirtsWomen = [
  {
    size: 'A',
    s: 64,
    m: 66,
    l: 68.5,
    xl: 71,
    xxl: 73.5
  },
  {
    size: 'C',
    s: 44,
    m: 48,
    l: 52,
    xl: 58,
    xxl: 64
  },
  {
    size: 'H',
    s: 16.5,
    m: 17.5,
    l: 18.5,
    xl: 19.5,
    xxl: 20.5
  }
]
const tShirtsMen = [
  {
    size: 'A',
    s: 70,
    m: 72,
    l: 74,
    xl: 76,
    xxl: 78
  },
  {
    size: 'C',
    s: 47,
    m: 51,
    l: 55,
    xl: 59,
    xxl: 64
  },
  {
    size: 'H',
    s: 19.5,
    m: 20.5,
    l: 21.5,
    xl: 22.5,
    xxl: 23.5
  }
]
const tShirtsUnisex = [
  {
    size: 'A',
    xs: 68,
    s: 70,
    m: 72,
    l: 74,
    xl: 76,
    xxl: 78,
    xxxl: 81
  },
  {
    size: 'C',
    xs: 43,
    s: 47,
    m: 51,
    l: 55,
    xl: 59,
    xxl: 64,
    xxxl: 70
  },
  {
    size: 'H',
    xs: 18.5,
    s: 19.5,
    m: 20.5,
    l: 21.5,
    xl: 22.5,
    xxl: 23.5,
    xxxl: 24.5
  }
]
const shirtsChilds = [
  {
    size: 'A',
    '10': 58,
    '12': 64
  },
  {
    size: 'C',
    '10': 42,
    '12': 46
  },
  {
    size: 'H',
    '10': 54,
    '12': 56
  }
]
const shirtsMen = [
  {
    size: 'A',
    s: 72,
    m: 74,
    l: 76,
    xl: 78,
    xxl: 80,
    xxxl: 82,
    xxxxl: 84
  },
  {
    size: 'C',
    s: 52,
    m: 56,
    l: 60,
    xl: 64,
    xxl: 68.5,
    xxxl: 74.5,
    xxxxl: 80.5
  },
  {
    size: 'H',
    s: 63,
    m: 65,
    l: 67,
    xl: 69,
    xxl: 71,
    xxxl: 73,
    xxxxl: 75
  }
]
const hoodieWomen = [
  {
    size: 'A',
    s: 65,
    m: 67,
    l: 69,
    xl: 71,
    xxl: 73
  },
  {
    size: 'C',
    s: 49,
    m: 53,
    l: 57,
    xl: 63,
    xxl: 69
  },
  {
    size: 'H',
    s: 62,
    m: 63,
    l: 64,
    xl: 65,
    xxl: 66
  }
]
const hoodieMen = [
  {
    size: 'A',
    s: 70,
    m: 72,
    l: 74,
    xl: 76,
    xxl: 78
  },
  {
    size: 'C',
    s: 52,
    m: 56,
    l: 60,
    xl: 64,
    xxl: 68.5
  },
  {
    size: 'H',
    s: 66,
    m: 67,
    l: 68,
    xl: 69,
    xxl: 70
  }
]
</script>

<template>
  <div class="mb-50">
    <ElRow justify="center">
      <h1>Tablice veličina</h1>
    </ElRow>

    <ElRow justify="center">
      <h2>Majice kratkih rukava</h2>
    </ElRow>

    <ElRow justify="center">
      <img
        src="../assets/images/tshirt-size.jpg"
        style="width: 250px"
        class="mb-24"
      />
    </ElRow>

    <ElRow justify="center">
      <h4>Djeca</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="tShirtsChilds"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="4" prop="4" width="45" align="center" />
        <ElTableColumn label="6" prop="6" width="45" align="center" />
        <ElTableColumn label="8" prop="8" width="45" align="center" />
        <ElTableColumn label="10" prop="10" width="45" align="center" />
        <ElTableColumn label="12" prop="12" width="45" align="center" />
      </ElTable>
    </ElRow>

    <ElRow justify="center">
      <h4>Žene</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="tShirtsWomen"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="S" prop="s" width="45" align="center" />
        <ElTableColumn label="M" prop="m" width="45" align="center" />
        <ElTableColumn label="L" prop="l" width="45" align="center" />
        <ElTableColumn label="XL" prop="xl" width="45" align="center" />
        <ElTableColumn label="2XL" prop="xxl" width="45" align="center" />
      </ElTable>
    </ElRow>

    <ElRow justify="center">
      <h4>Muškarci</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="tShirtsMen"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="S" prop="s" width="45" align="center" />
        <ElTableColumn label="M" prop="m" width="45" align="center" />
        <ElTableColumn label="L" prop="l" width="45" align="center" />
        <ElTableColumn label="XL" prop="xl" width="45" align="center" />
        <ElTableColumn label="2XL" prop="xxl" width="45" align="center" />
      </ElTable>
    </ElRow>

    <ElRow justify="center">
      <h4>Unisex</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="tShirtsUnisex"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="XS" prop="xs" width="45" align="center" />
        <ElTableColumn label="S" prop="s" width="45" align="center" />
        <ElTableColumn label="M" prop="m" width="45" align="center" />
        <ElTableColumn label="L" prop="l" width="45" align="center" />
        <ElTableColumn label="XL" prop="xl" width="45" align="center" />
        <ElTableColumn label="2XL" prop="xxl" width="45" align="center" />
      </ElTable>
    </ElRow>

    <ElRow justify="center">
      <h2>Majice dugih rukava</h2>
    </ElRow>

    <ElRow justify="center">
      <img
        src="../assets/images/shirt-size.jpg"
        style="width: 250px"
        class="mb-24"
      />
    </ElRow>

    <ElRow justify="center">
      <h4>Djeca</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="shirtsChilds"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="10" prop="10" width="45" align="center" />
        <ElTableColumn label="12" prop="12" width="45" align="center" />
      </ElTable>
    </ElRow>

    <ElRow justify="center">
      <h4>Muškarci</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="shirtsMen"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="s" prop="s" width="45" align="center" />
        <ElTableColumn label="m" prop="m" width="45" align="center" />
        <ElTableColumn label="l" prop="l" width="45" align="center" />
        <ElTableColumn label="xl" prop="xl" width="45" align="center" />
        <ElTableColumn label="xxl" prop="xxl" width="45" align="center" />
        <ElTableColumn label="xxxl" prop="xxxl" width="45" align="center" />
        <ElTableColumn label="xxxxl" prop="xxxxl" width="50" align="center" />
      </ElTable>
    </ElRow>

    <ElRow justify="center">
      <h2>Hoodie</h2>
    </ElRow>

    <ElRow justify="center">
      <img
        src="../assets/images/hoodie-size.jpg"
        style="width: 250px"
        class="mb-24"
      />
    </ElRow>

    <ElRow justify="center">
      <h4>Žene</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="hoodieWomen"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="S" prop="s" width="45" align="center" />
        <ElTableColumn label="M" prop="m" width="45" align="center" />
        <ElTableColumn label="L" prop="l" width="45" align="center" />
        <ElTableColumn label="XL" prop="xl" width="45" align="center" />
        <ElTableColumn label="2XL" prop="xxl" width="45" align="center" />
      </ElTable>
    </ElRow>

    <ElRow justify="center">
      <h4>Muškarci</h4>
    </ElRow>
    <ElRow justify="center">
      <ElTable
        :data="hoodieMen"
        stripe
        align="middle"
        class-name="description-table"
      >
        <ElTableColumn label="Veličina" prop="size" width="72" align="center" />
        <ElTableColumn label="S" prop="s" width="45" align="center" />
        <ElTableColumn label="M" prop="m" width="45" align="center" />
        <ElTableColumn label="L" prop="l" width="45" align="center" />
        <ElTableColumn label="XL" prop="xl" width="45" align="center" />
        <ElTableColumn label="2XL" prop="xxl" width="45" align="center" />
      </ElTable>
    </ElRow>
  </div>
</template>

<style scoped>
.mb-50 {
  margin-bottom: 50px;
}
</style>
