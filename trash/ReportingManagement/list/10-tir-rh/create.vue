<template>
  <div class="wrap__content">
    <div class="container">
      <div class="row">
        <div class="col-xl-2 col-lg-3">
          <v-sidebar :active="['ReportingManagement']"></v-sidebar>
        </div>
        <div class="col-xl-10 col-lg-9">
          <div class="content-wrapper">
            <div class="card__content">
              <HeaderBack
                :title="$t('reporting.title')"
                :subtitle="'Сведения о контрольно-инспекционной деятельности территориальных органов в части охраны рыбных ресурсов'"
              />
              <div class="card__content--body">
                <form
                  method="POST"
                  enctype="multipart/form-data"
                  @submit.prevent="onSubmit"
                >
                
				
				
				
  <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">№</th>
      <th scope="col">Наименование показателей</th>
	  <th scope="col">Количество (единица измерения)</th>
      <th scope="col" colspan='2'>За отчетный период</th>
      <th scope="col" colspan='2'>Сначала года</th>
	 
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Составлено протоколов о нарушении рыбоохранного
        законодательства, из них
	  </td>
	  <td rowspan="7" class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='количество протоколов/человек'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
  
 <tr v-for="(item,key) in row1">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
   
<!-----------------------row2-------------------------------->   
  <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Передано дел на нарушителей рыбоохранного законодательства в следственные органы, из них
	  </td>
	  <td rowspan="9" class="td__input col-3">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='дел/человек	'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
  
   <tr v-for="(item,key) in row2">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
  
  <!---------------------------------------->
   <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    безличные нарушения
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='дел'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	<!-----------------row 3----------------------->
   <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Открыто нарушений совместно с сотрудниками правоохранительных органов
	  </td>
	  <td rowspan="4" class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='(количество) протоколов'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	 <tr v-for="(item,key) in row3">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
<!----------------------------------------->	
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    направлено дел на принудительное взыскание
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='человек/тысяча тенге'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	<!-----------------row 4----------------------->
   <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Взыскано штрафов
	  </td>
	  <td rowspan="6" class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='(количество) протоколов'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	 <tr v-for="(item,key) in row4">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
<!----------------------------------------->
	
		
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Предъявлено за ущерб
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='человек/тысяча тенге'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
		
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Взыскано за ущерб
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='человек/тысяча тенге'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	
	
		
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Взыскано сумма штрафа прошлых лет
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='человек/тысяча тенге'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Взыскано сумма иска прошлых лет
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='человек/тысяча тенге'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<!-----------------row 5----------------------->
   <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Поступило средств от реализации конфискантов, всего
	  </td>
	  <td rowspan="4" class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='человек/тысяча тенге'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	 <tr v-for="(item,key) in row5">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	<!-----------------row 6----------------------->
   <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Изъято у нарушителей, всего
	  </td>
	  <td rowspan="5" class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='килограмм'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	 <tr v-for="(item,key) in row6">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
<!----------------------------------------->

	<!-----------------row 7----------------------->
   <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Изъято у нарушителей орудий лова, транспортных и плавательных средств, всего
	  </td>
	  <td rowspan="5" class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='штук'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	 <tr v-for="(item,key) in row7">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	
	<!----------------------------------------->
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5'>
	    транспортных и плавательных средств
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='транспортных/плавательных средств'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5'>
	    средства связи
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5'>
	    навигаторов
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	<tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5'>
	    эхолотов
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Aгитационно-массовая работа
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5'>
	    выступление по радио
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5'>
	    выступление по телевидению
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5'>
	    Количество актов составленных при проверке промысловых орудий лова
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='штук'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5'>
	  при этом вскрыто нарушений
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='штук'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5'>
	  Количество проверок водозаборов
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
	
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5'>
	  при этом вскрыто нарушений
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!-------------------row8---------------------->
	
	
	 <tr>
      <th class='align-middle' scope="row">1</th>
      <td class='col-5 table-title-left'>
	    Участие технических средств и инспекторов
	  </td>
	  <td rowspan="4" class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder='единиц'>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	 <tr v-for="(item,key) in row8">
      <th class='align-middle' scope="row">{{key+2}}</th>
      <td>
	  {{item.name}}
	 </td>
	  <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	<tr>
      <th class='align-middle ' scope="row">1</th>
      <td class='col-5 table-title-left'>
	  Организовано рыбоохранных постов
	  </td>
	  <td class="td__input col-3 ">
	     <div class="form__input--input">
           <input type="text"  class="input-linck" placeholder=''>
         </div>
	  </td>
	  
      <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
       <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
	    <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
     <td class="td__input col-1">
	   <div class="form__input--input">
           <input type="text"  class="input-linck" >
         </div>
	  </td>
    </tr>
	<!----------------------------------------->
  </tbody>
</table			
				
				
				
				
				
				
				
				
	
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
                  <hr class="reporting__hr" />

                  <div class="reporting-btn">
                    <div class="reporting-wrapper">
                      <button type="submit" class="input-btn form__line--btn">
                        {{ $t("button.save") }}
                      </button>
                    </div>
                  </div>
                </form>

                <modal
                  class="modal__block modal__block--middle modal__block--success"
                  name="modal_head"
                  :width="550"
                  :min-width="550"
                  height="auto"
                >
                  <div class="modal__block--wrapper">
                    <div
                      class="modal__block--close"
                      @click="$modal.hide('modal_head')"
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.5 7.5L7.5 22.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.5 7.5L22.5 22.5"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="modal__wrapper">
                      <div class="modal__header">
                        <div class="modal__title">
                          {{ $t("reporting.ecp_text") }}
                        </div>
                      </div>

                      <div class="modal__content">
                        <div class="modal__form">
                          <div class="block__row">
                            <div class="block__row--left">
                              <a
                                class="block__item block__item--green"
                                @click="saveElement"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 18.3333C14.6025 18.3333 18.3334 14.6025 18.3334 9.99996C18.3334 5.39746 14.6025 1.66663 10 1.66663C5.39752 1.66663 1.66669 5.39746 1.66669 9.99996C1.66669 14.6025 5.39752 18.3333 10 18.3333Z"
                                    stroke="#5ABB5E"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M7.5 10L9.16667 11.6667L12.5 8.33337"
                                    stroke="#5ABB5E"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                {{ $t("button.ecp") }}
                              </a>
                            </div>
                            <div class="block__row--right">
                              <a
                                class="block__item block__item--blue"
                                @click="$modal.hide('modal_head')"
                              >
                                {{ $t("button.cancel") }}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//:disabled="statusPage == 'show'"
import TextInput from "@/components/components/Inputs/TextInput.vue";
import Region from "@/components/components/Inputs/region";
import Pond from "@/components/components/Inputs/pond";
import Kato from "@/components/components/Inputs/kato";
import Fish from "@/components/components/Inputs/fish";
import SelectInputRepeater from "@/components/components/Inputs/selectInputRepeater";
import FishTonTenge from "@/components/components/Inputs/fishTonTenge";
import EmployeeAdd from "@/components/components/Inputs/employeeAdd";
import { required } from "vuelidate/lib/validators";

import HeaderBack from '@/components/UI/HeaderBack.vue';

export default {
  name: "edit",
  components: {
    HeaderBack,
    FishTonTenge,
    SelectInputRepeater,
    Fish,
    EmployeeAdd,
    Kato,
    Pond,
    Region,
    TextInput,
    
  },
  props: {
    statusPage: {
      type: String,
      default: "create",
    },
  },
  validations: {},
  data() {
    return {
      userRegions: null,
       row1:[
		{name:'за загрязнение водоемов',metka:false},
		{name:'за нарушение режима судоходства',metka:false},
		{name:'за незаконный лов рыбы',metka:false},
		{name:'Рассмотрено административных материалов Инспекцией',metka:true},
		{name:'количество дел об административных правонарушениях, направленных в суд',metka:false},
		{name:'привлечено судом к административной ответственности',metka:false}
		],
		row2:[
		{name:'возбуждено уголовных дел',metka:false},
		{name:'направлено уголовных дел в суд',metka:false},
		{name:'привлечено судом к уголовной ответственности',metka:false},
		{name:'в процессе рассмотрения в суде',metka:true},
		{name:'отказано в возбуждении уголовного дела и рассмотрено по производству об административных правонарушениях, из них',metka:false},
		{name:'инспекцией',metka:false},
		{name:'судом',metka:false},
		{name:'правоохранительным органом',metka:false}
		],
		row3:[
		{name:'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',metka:false},
		{name:'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',metka:false},
		{name:'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',metka:false},
		],
		row4:[
		{name:'в добровольном порядке',metka:false},
		{name:'по статье 383 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',metka:false},
		{name:'по статье 389 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',metka:false},
		{name:'по статье 811 Кодекса Республики Казахстан от 5 июля 2014 года "Об административных правонарушениях"',metka:false},
		{name:'в принудительном порядке',metka:false},
		],
		row5:[
		{name:'рыбы',metka:false},
		{name:'икры',metka:false},
		{name:'транспортных и плавательных средств',metka:false},
		],
		row6:[
		{name:'рыбы частиковых видов',metka:false},
		{name:'рыбы осетровых видов',metka:false},
		{name:'икры осетровых видов',metka:false},
		{name:'иных видов',metka:false},
		
		],
		row7:[
		{name:'рыбы частиковых видов',metka:false},
		{name:'сетей',metka:false},
		{name:'петель и другие',metka:false},
		{name:'иных видов',metka:false},
		
		],
		row8:[
		{name:'количество речных судов',metka:false},
		{name:'количество морских судов',metka:false},
		{name:'участие мотолодок',metka:false},
		
		
		],
      formApp: {
		
        region: null,
        region_list: [{ id: null, name: null }],
        country_list: [{ id: null, name: null }],
        kato: null,
        fish: null,

        pond: [],
        fishTonTenge: [],
        employees: [],

        number1: "",
        number2: "",
        number3: "",
      },
    };
  },
  watch: {
    "$store.state.userObject": function () {
      this.apiGetUserRegions();
    },
  },
  methods: {
    add_array() {
      this.formApp.region_list.push({ id: null, name: null });
    },
    apiGetUserRegions() {
      if (
        this.$store.state.userObject &&
        this.$store.state.userObject.regions
      ) {
        let array = [];
        this.$store.state.userObject.regions.find((element) => {
          array.push(element.region_id);
        });
        this.userRegions = array;
      }
    },

    saveElement() {
      this.ecp = false;
      const websocket = new WebSocket("wss://127.0.0.1:13579/");
      var ready = null;
      let ecpData = {
        path: null,
        owner: null,
        data: null,
      };
      websocket.onopen = () => {
        ready = true;
        handle();
      };
      websocket.onclose = (e) => {
        if (e.wasClean) {} else {
          if (this.$i18n.locale == "kz")
            alert("NCYLayer бағдарламасы іске қосылғандығына көз жеткізіңіз");
          if (this.$i18n.locale == "ru")
            alert("Убедитесь, что программа NCALayer запущена");
          if (this.$i18n.locale == "en")
            alert("Make sure that the NCALayer program is running");

          //setErrormodal(true);
          setTimeout(() => {
            //setErrormodal(false);
          }, 5000);
        }
      };
      function handle() {
        if (!ready) {
          alert("Убедитесь, что программа NCALayer запущена");
        } else {
          const data = {
            module: "kz.gov.pki.knca.commonUtils",
            method: "signXml",
            args: [
              "PKCS12",
              "SIGNATURE",
              "<login><sessionid>caacda70-fd36-45ed-8d94-45a88890f83a</sessionid></login>",
              "",
              "",
            ],
          };
          websocket.send(JSON.stringify(data));
        }
      }
      websocket.onmessage = (e) => {
        const dataEcp = JSON.parse(e.data);
        if (dataEcp.responseObject) {
          //this.onSubmit();
        }
      };
    },
    onSubmit(evt) {
      this.$v.$touch();
      if (!this.$v.$invalid) {}
    },
  },
  beforeCreate() {
    if (!localStorage.token) {
      this.$router.push("/ru/login");
    }
  },
  mounted() {},
};
</script>

<style scoped>
.td__input {
  position: relative;
}
.form__input--input {
  width: 100%;
  height: 90%;
}
table tr td input.text-left{
	
	transform: translateX(20px);
	
}
table tr td,
table tr th {
  padding: 5px 20px !important;
  border: 1px solid #000 !important;
}
table tr th {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #0a091d;
}
table tbody tr td {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #000000;
}
table thead tr th {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
}
.table-title-left {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  color: #000000;
}

</style>
